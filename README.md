<h1 align="center" style="display: block; text-align: center;">🐣 <i>smoltalk</i></h1>

---

## 🔧 Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run _smoltalk_. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various OpenAI and authentication provider accounts.

Copy the `.env.example` file and populate the required env vars:

```bash
cp .env.example .env
```

[Install the Supabase CLI](https://supabase.com/docs/guides/cli) and start the local Supabase stack:

```bash
npm install supabase --save-dev
npx supabase start
```

Install the local dependencies and start dev mode:

```bash
yarn
yarn dev
```

Your app template should now be running on [localhost:3000](http://localhost:3000/).

## 🖋️ Authors

- Shawn Wang ([@swyx](https://twitter.com/swyx))
- Drake Costa ([@saeris](https://twitter.com/saeris))
- Sean Oliver ([@seanoliver](https://twitter.com/SeanOliver))

## 📣 Acknowledgements

This app was forked from [@vercel-labs/ai-chatbot](https://github.com/vercel-labs/ai-chatbot).
