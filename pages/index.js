import { useState } from "react";
import Router from "next/router";
import Layout from "../components/Layout";
import Row from "../components/prebuilt/Row";
import DancePackage from "../components/prebuilt/DancePackage";
import CheckoutForm from "../components/CheckoutForm";
import getDancePackagePrice from "../utils/getDancePackagePrice";

/**
 * The MainPage function returns a Layout component that contains a Row component that contains a
 * DancePackage component and a CheckoutForm component
 * @returns The MainPage component is being returned.
 */

const MainPage = () => {
  const [numberOfDancePackages, setNumberOfDancePackages] = useState(1);

  /**
   * If the number of dance packages is less than 12, add one to the number of dance packages. Otherwise,
   * don't change the number of dance packages.
   */
  const onAddDancePackage = () =>
    setNumberOfDancePackages((numberOfDancePackages) =>
      Math.min(12, numberOfDancePackages + 1)
    );

  /**
   * If the number of dance packages is greater than 1, subtract 1 from the number of dance packages.
   * The Math.max() function is used to ensure that the number of dance packages is never less than 1
   */
  const onRemoveDancePackage = () =>
    setNumberOfDancePackages((numberOfDancePackages) =>
      Math.max(1, numberOfDancePackages - 1)
    );

  return (
    <Layout title="Pay 2 Dance 🕺">
      <Row>
        <DancePackage
          onAddDancePackage={onAddDancePackage}
          onRemoveDancePackage={onRemoveDancePackage}
          numberOfDancePackages={numberOfDancePackages}
        />
      </Row>
      <CheckoutForm
        price={getDancePackagePrice(numberOfDancePackages)}
        onSuccessfulCheckout={() => Router.push("/success")}
      />
    </Layout>
  );
};

export default MainPage;
