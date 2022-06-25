/* Importing the FormField component from the FormField.js file. */
import FormField from "./FormField";

/* Creates a filed for Billing details and for record keeping */
const BillingDetailsFields = () => {
  return (
    <>
    <FormField
        name="Studio"
        label="Studio"
        type="text"
        placeholder="Studio Name"
        required
      />
      <FormField
        name="name"
        label="Name"
        type="text"
        placeholder="Jane Doe"
        required
      />
      <FormField
        name="email"
        label="Email"
        type="email"
        placeholder="jane.doe@example.com"
        required
      />
      <FormField
        name="address"
        label="Address"
        type="text"
        placeholder="902 Grand Avenue"
        required
      />
      <FormField
        name="city"
        label="City"
        type="text"
        placeholder="Saint Paul"
        required
      />
      <FormField
        name="state"
        label="State"
        type="text"
        placeholder="Minnesota"
        required
      />
      <FormField
        name="zip"
        label="ZIP"
        type="text"
        placeholder="55105"
        required
      />
    </>
  );
};

export default BillingDetailsFields;
