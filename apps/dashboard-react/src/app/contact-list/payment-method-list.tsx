import styles from "./payment-method-list.module.scss";
import { gql, useQuery as useQueryApollo } from "@apollo/client";
import { useQuery } from "../core/graphql/use-query";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { UI_GET_LOGGED_IN_USER } from "../app";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
Chart.defaults.color = "#fff";

interface UiPaymentMethod {
  id: string;
  isDefault: boolean;
  email: string;
  bankName: string;
  bankCode: string;
  bic: string;
  iban: string;
  accountHolder: string;
}

export const UI_ALL_PAYMENT_METHODS_PAGED_QUERY = gql`
  query allPaymentMethods {
    allPaymentMethods {
      id
      isDefault
      email
      bankName
      bankCode
      bic
      iban
      accountHolder
    }
  }
`;

/**
 * Check whether the payment-method is pay-pal.
 *
 * @param paymentMethod The payment-method to check.
 */
const isPaypal = (paymentMethod: { email?: string }) => {
  return !!paymentMethod.email;
};

/**
 * Creates a chart with the contact titles.
 * @param bankNames The bank-names to create the chart for.
 */
function createBankNameChart(bankNames: Record<string, unknown>) {
  return {
    labels: Object.keys(bankNames),
    datasets: [
      {
        label: "Banknamen",
        data: Object.values(bankNames),
        backgroundColor: "#1e88e5",
      },
    ],
  };
}

/* eslint-disable-next-line */
export interface ContactListProps {}

export function PaymentMethodList(_: ContactListProps) {
  /** Get the currently authenticated user. */
  const { data: authenticatedUser } = useQueryApollo(UI_GET_LOGGED_IN_USER, { fetchPolicy: "cache-only" });

  const { loading, data } = useQuery({
    query: UI_ALL_PAYMENT_METHODS_PAGED_QUERY,
  });

  if (loading) return <p>Loading...</p>;

  const extendedPaymentMethods: Array<UiPaymentMethod & { isPayPal: boolean }> =
    data?.allPaymentMethods.map((paymentMethod: UiPaymentMethod) => {
      return {
        ...paymentMethod,
        isPaypal: isPaypal(paymentMethod),
      };
    }) ?? [];

  const bankMap = new Map<string, number>();
  /** Aggregate the names of the banks. */
  extendedPaymentMethods
    .filter((value) => !isPaypal(value))
    .map((value) => value.bankName)
    .forEach((value) => {
      if (bankMap.has(value)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked before
        bankMap.set(value, bankMap.get(value)! + 1);
      } else {
        bankMap.set(value, 1);
      }
    });
  const bankNames: { [key: string]: number } = Object.assign({}, ...[...bankMap.entries()].map(([k, v]) => ({ [k]: v })));
  /** Add the amount of pay-pal accounts to the bank-names. */
  const bankNamesWithPayPal = {
    ...bankNames,
    PayPal: extendedPaymentMethods.length - bankMap.size,
  };
  const bankNamesSorted = Object.entries(bankNamesWithPayPal)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  const chartData = createBankNameChart(bankNamesSorted);

  return (
    <>
      <h1 className="mat-headline-6">Willkommen {authenticatedUser?.getAuthenticatedUser?.username}</h1>
      <p>Top Bezahlmethoden:</p>
      <div className={styles["list"]}>
        <Bar data={chartData} width={500} height={350} options={{ maintainAspectRatio: false }} />
      </div>
    </>
  );
}

export default PaymentMethodList;
