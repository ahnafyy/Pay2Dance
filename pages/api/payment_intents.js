import Stripe from "stripe";
const stripe = new Stripe(process.env.SECRET_KEY);

/* This is the code for the server side of the application. It is a function that is called when the
user clicks the pay button. We create a paymentIntent to be fulfilled by stripe! */
export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
      });

      res.status(200).send(paymentIntent.client_secret);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
