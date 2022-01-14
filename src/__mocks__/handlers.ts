import { rest } from "msw";
import { mockRatesResponse } from "./ratesMock";


export const handlers = [
	rest.get('https://openexchangerates.org/api/latest.json', (req, res, ctx) => {
			const app_id = req.url.searchParams.get('app_id');
			const symbols = req.url.searchParams.get('app_id');
			return res(ctx.status(200), ctx.json({
				app_id,
				symbols,
				...mockRatesResponse
			}));
		},
	),
	rest.get("*", (req, res, ctx) => {
		console.error(`Please add request handler for ${req.url.toString()}`);
		return res(
			ctx.status(500),
			ctx.json({ error: "You must add request handler." }),
		);
	}),

	rest.post("*", (req, res, ctx) => {
		console.error(`Please add POST request handler for ${req.url.toString()}`);
		return res(
			ctx.status(500),
			ctx.json({ error: "You must add request handler." }),
		);
	}),

	rest.put("*", (req, res, ctx) => {
		console.error(`Please add PUT request handler for ${req.url.toString()}`);
		return res(
			ctx.status(500),
			ctx.json({ error: "You must add request handler." }),
		);
	}),
];
