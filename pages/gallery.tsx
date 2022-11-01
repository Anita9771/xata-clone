import type { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import galleryStyles from "../styles/gallery.module.css";
import homePageStyles from "../styles/homepage.module.css";
import dotenv from "dotenv"
import Link from "next/link";
dotenv.config();

export default function gallery({
  images
}: InferGetServerSidePropsType<typeof getServerSideProps>) {


  // async function handleLoadMore() {
   
  //   const results = await fetch('api/search', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       nextCursor
  //     })
  //   }).then(res => res.json())
    
  //   const { resources, next_cursor: updatedNextCursor} = results;
  //   const images = mapImageResources(resources);
  // }


  return (
    <div className='gallery'>
      <Head>
        <title>Mode-el</title>
        <meta
          name="keywords"
          content="xata, photography, portfolio, cloudinary, next js, hackmamba, jamstack"
        />
        <link rel="icon" href="camera-icon.png" />
      </Head>

      {/* <h2 className={homePageStyles.logo}>MODE-EL</h2> */}
{/* 
      <h1>
        GALLERY
      </h1> */}
<div className='images'>
{images?.map((image) => {
        return (
          <div key={image.id} >
          <img src={image.image} alt={image.title}/>
          </div>
        );
      })} 
</div>

      <nav>
      <Link className='link' href="/">HOME</Link>
      {/* <button onClick={handleLoadMore} >VIEW MORE</button> */}
      </nav>
    </div>
  );
}



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