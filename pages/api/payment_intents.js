import Stripe from "stripe";

const stripe = new Stripe(process.env.SECRET_KEY);

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { amount, customer, receipt_email, metaData, currency } = req.body;
      // For production-ready applications we recommend not using the
      // amount directly from the client without verifying it first. This is to
      // prevent bad actors from changing the total amount on the client before
      // it gets sent to the server. A good approach is to send the quantity of
      // a uniquely identifiable product and calculate the total price server-side.
      // Then, you would only fulfill orders using the quantity you charged for.

      /* This is creating a payment intent. */
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        customer,
        receipt_email,
        metaData,
        currency,
      });

      /* This is sending the client secret to the client. */
      res.status(200).send(paymentIntent.client_secret);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
