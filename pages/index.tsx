import type { InferGetServerSidePropsType } from "next";
import { XataClient, getXataClient } from "../utils/xata.codegen";
import Head from "next/head";
import homePageStyles from "../styles/homepage.module.css";
import { TestForm } from "../components/TestForm";
import dotenv, {config}  from "dotenv"
// config();
// const fs = require('fs')

export default function IndexPage({
  links,
  images,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // console.log('images', images)

  return (
    <div className={homePageStyles.homepage}>
      <Head>
        <title>Mode-el</title>
        <meta
          name="keywords"
          content="xata, photography, portfolio, cloudinary, next js, hackmamba, jamstack"
        />
        <link rel="icon" href="../public/camera_icon.png" />
      </Head>

      <div className={homePageStyles.topImages}>
        <img
          src="https://res.cloudinary.com/doy3ks7ls/image/upload/v1666949924/LandingPage/houcine-ncib-8z4bWUYXsJg-unsplash_1_xfjvmn.png"
          alt="man"
        />
        <img
          src="https://res.cloudinary.com/doy3ks7ls/image/upload/v1666949922/LandingPage/gideon-hezekiah-gbRTZdPv03w-unsplash_1_aag6wo.png"
          alt="woman"
        />
      </div>

      <h2 className={homePageStyles.logo}>MODE-EL</h2>

      <div className={homePageStyles.topContent}>
        <h1>
          think <span>you've seen</span> magic?
        </h1>
        <div className={homePageStyles.topContentBtn}>
          <button className={homePageStyles.leftButton}>CONTACT US</button>
          <button className={homePageStyles.rightButton}>GALLERY</button>
        </div>
      </div>

      <div className={homePageStyles.dancingLady}>
        <img
          src="https://res.cloudinary.com/doy3ks7ls/image/upload/v1666949925/LandingPage/vladimir-yelizarov-tGRks1CV_HA-unsplash_1_v4owa9.png"
          alt="dancing lady"
        />
      </div>

      <div className={homePageStyles.ctaOne}>
        <h2># Photography Agency</h2>
        <p>
          We are the problem solvers that will help you convey your message in
          pixels. We communicate creatively both online and offline and always
          putting a smile on your face through satisfaction.
        </p>
      </div>
      <div className={homePageStyles.womanGlasses}>
        <img
          src="https://res.cloudinary.com/doy3ks7ls/image/upload/v1666949924/LandingPage/joren-aranas-nmuyqgSOpEE-unsplash_1_g2dxcc.png"
          alt="woman in glasses"
        />
      </div>
      <div className={homePageStyles.ctaTwo}>
        <h2>Want To Be Discovered?</h2>
        <p>
          We are the problem solvers that will help you convey your message in
          pixels. We communicate creatively both online and offline and always
          putting a smile on your face through satisfaction.
        </p>
      </div>
      <div className={homePageStyles.guyGlasses}>
        <img src="https://res.cloudinary.com/doy3ks7ls/image/upload/v1666949922/LandingPage/briona-baker-k2_63qVWvBQ-unsplash_1_ccp34u.png" alt="guy in glasses" />
      </div>

      {/* {images.map((image) => {
        return (
          <div className="images" key={image.id} style={{display: 'flex'}} >
          <img src={image.image} alt={image.title} width="50px" height="50px" />
          </div>
        );
      })} */}

      <div className={homePageStyles.testimonials}>
        <div className={homePageStyles.testimonialsHead}>
        <h2>TESTIMONIALS</h2>
        </div>
      {links.map((link) => {
        return (
          <section className={homePageStyles.testimonial} key={link.id}>
            <img src="https://res.cloudinary.com/doy3ks7ls/image/upload/v1666949927/LandingPage/sam-burriss-uaq0y8pb6W4-unsplash_1_rpgydx.png" alt="" />
            <p>{link.name}</p>
            <p>{link.title}</p>
            <p>{link.description}</p>
            <p>{link.occupation}</p>
          </section>
        );
      })}
      </div>


      <TestForm />
    </div>
  );
}

console.log(process.env.XATA_API_KEY)




export const getServerSideProps = async () => {
  // const xata = await getXataClient();
  const xata = new XataClient({apiKey: "xau_uzhMDDgbL6E223PELWfvZjTr5nkVEfvq2"});
  const links = await xata.db.clients.getAll();
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

  const images = resources.map((resource: { asset_id?: any; public_id?: any; secure_url?: any; width?: any; height?: any; }) => {
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
      links,
      images,
    },
  };
};
