const _env = process.env.NODE_ENV;
export const env = {
  environment: _env,
  isDevelopment: _env === "development",
  clientUrls: {
    recipeManagement: () => {
      switch (_env) {
        case "development":
          return "https://localhost:5375";
        default:
          throw "Environment variable not set for 'recipeManagement'";
      }
    },
  },
};
