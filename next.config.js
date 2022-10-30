module.exports = {
  // env: {
  //   apiKey: "xau_uzhMDDgbL6E223PELWfvZjTr5nkVEfvq2",
  //   CLOUDINARY_CLOUD_NAME: "doy3ks7ls",
  //   CLOUDINARY_API_KEY: "656428741614364",
  //   CLOUDINARY_API_SECRET: "Qkkt2R8CgQDfD2vtIJ3hf6uzCCM"
  // },
    future: {
      webpack5: true, // by default, if you customize webpack config, they switch back to version 4. 
        // Looks like backward compatibility approach.
    },
    webpack(config) {
      config.resolve.fallback = {
        ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified// if you miss it, all the other options in fallback, specified
          // by next.js will be dropped. Doesn't make much sense, but how it is
        fs: false, // the solution
      };

      return config;
    },
  };