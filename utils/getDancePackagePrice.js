/**
 * This function takes in a number of dance packages and returns the total price of those dance
 * packages with a 3% Stripe charge added.
 * @param numberOfDancePackages - The number of dance packages the user wants to purchase.
 * @returns The total price of the dance packages with a 3% stripe charge added.
 */
const getDancePackagePrice = (numberOfDancePackages) => {
  const priceOfOnceDancePackage = 35;
  const totalPriceOfDancePackages =
    numberOfDancePackages * priceOfOnceDancePackage;
  const totalPriceWithAdded3PercentStripeCharge = Math.round(
    totalPriceOfDancePackages * 1.03
  ).toFixed(2);

  return totalPriceWithAdded3PercentStripeCharge;
};

export default getDancePackagePrice;
