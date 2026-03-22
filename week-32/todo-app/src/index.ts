export default {
	async fetch(request, env, ctx): Promise<Response> {
		return new Response('Hello World! ' + Math.random());
	},
} satisfies ExportedHandler<Env>;