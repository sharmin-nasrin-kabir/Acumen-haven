import js from "@eslint/js";
import next from "eslint-config-next";

const eslintConfig = [
    js.configs.recommended,
    ...next,
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        rules: {
            "no-unused-vars": "warn",
            "no-console": "off",
        },
    },
];

export default eslintConfig;
