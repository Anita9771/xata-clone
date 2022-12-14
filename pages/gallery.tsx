import type { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import dotenv from "dotenv";
import Link from "next/link";
dotenv.config();

export default function gallery({
  images,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  // Some UI rendering
  return (
    <div className="gallery">
      <Head>
        <title>Mode-el</title>
        <meta
          name="keywords"
          content="xata, photography, portfolio, cloudinary, next js, hackmamba, jamstack"
        />
        <link rel="icon" href="camera-icon.png" />
      </Head>

      {/* Looping through cloudinary images */}
      <div className="images">
        {images?.map((image) => {
          return (
            <div key={image.id}>
              <img src={image.image} alt={image.title} />
            </div>
          );
        })}
      </div>

      <nav>
        <Link className="link" href="/">
          HOME
        </Link>
      </nav>
    </div>
  );
}

// Calling cloudinary API
export const getServerSideProps = async () => {
  const results = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.CLOUDINARY_API_KEY +
            ":" +
            process.env.CLOUDINARY_API_SECRET
        ).toString("base64")}`,
      },
    }
  ).then((res) => res.json());

  const { resources } = results;

  const images = resources?.map((resource) => {
    const { width, height } = resource;
    return {
      id: resource.asset_id,
      title: resource.public_id,
      image: resource.secure_url,
      width,
      height,
    };
  });
  return {
    props: {
      images,
    },
  };
};
