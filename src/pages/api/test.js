
export default async function handler(req, res) {
	try {
		res.status(200).json({ text: "hello-test" });
	}
	catch (err) {
		console.log("ratty")
	}
}
