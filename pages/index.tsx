import type { InferGetServerSidePropsType } from "next";
import { XataClient, getXataClient } from "../utils/xata.codegen";
import Head from "next/head";
import { TestForm } from "../components/TestForm";
import dotenv from "dotenv";
import Link from "next/link";
dotenv.config();
// const fs = require('fs')

export default function IndexPage({
  links,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // console.log('images', images)

  const onBtnClick = (e) => {
    e.preventDefault();
    // const goto = e.target.getAttribute('goto');
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("contact").offsetTop - 60,
        behavior: "smooth",
      });
    }, 50);
  };

  const onIconClick = (e) => {
    e.preventDefault();
    // const goto = e.target.getAttribute('goto');
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("contactBtn").offsetTop - 60,
        behavior: "smooth",
      });
    }, 50);
  };

  return (
    <div className="homepage">
      <Head>
        <title>Mode-el</title>
        <meta
          name="keywords"
          content="xata, photography, portfolio, cloudinary, next js, hackmamba, jamstack"
        />
        <link rel="icon" href="camera-icon.png" />
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
        {/* <link rel="stylesheet" href="../styles/homepage.module.css" /> */}
      </Head>

      <div className='top-images'>
        <img
          src="https://res.cloudinary.com/doy3ks7ls/image/upload/v1666949924/LandingPage/houcine-ncib-8z4bWUYXsJg-unsplash_1_xfjvmn.png"
          alt="man"
        />
        <img
          src="https://res.cloudinary.com/doy3ks7ls/image/upload/v1666949922/LandingPage/gideon-hezekiah-gbRTZdPv03w-unsplash_1_aag6wo.png"
          alt="woman"
        />
      </div>

      {/* <h2 className=logo}>MODE-EL</h2> */}

      <div className='top-content'>
        <h1>
          think <span>you've seen</span> magic?
        </h1>
        <div className='top-content-btn'>
          <button
            id="contactBtn"
            onClick={onBtnClick}
            className='left-button'
          >
            CONTACT US
          </button>
          <Link href="/gallery">
            <button className='right-button'>GALLERY</button>
          </Link>
        </div>
      </div>

      <div className='dancing-lady'>
        <img
          src="https://res.cloudinary.com/doy3ks7ls/image/upload/v1666949925/LandingPage/vladimir-yelizarov-tGRks1CV_HA-unsplash_1_v4owa9.png"
          alt="dancing lady"
        />
      </div>

      <div className='cta-one'>
        <h2># Photography Agency</h2>
        <p>
          We are the problem solvers that will help you convey your message in
          pixels. We communicate creatively both online and offline and always
          putting a smile on your face through satisfaction.
        </p>
      </div>
      <div className='woman-in-glasses'>
        <img
          src="https://res.cloudinary.com/doy3ks7ls/image/upload/v1666949924/LandingPage/joren-aranas-nmuyqgSOpEE-unsplash_1_g2dxcc.png"
          alt="woman in glasses"
        />
      </div>
      <div className='cta-two'>
        <h2>Want To Be Discovered?</h2>
        <p>
          We are the problem solvers that will help you convey your message in
          pixels. We communicate creatively both online and offline and always
          putting a smile on your face through satisfaction.
        </p>
      </div>
      <div className='guy-in-glasses'>
        <img
          src="https://res.cloudinary.com/doy3ks7ls/image/upload/v1666949922/LandingPage/briona-baker-k2_63qVWvBQ-unsplash_1_ccp34u.png"
          alt="guy in glasses"
        />
      </div>

      {/* {images?.map((image) => {
        return (
          <div className="images" key={image.id} style={{display: 'flex'}} >
          <img src={image.image} alt={image.title} width="50px" height="50px" />
          </div>
        );
      })} */}

      <div className='testimonials'>
        <div className='testimonials-head'>
          <h2>TESTIMONIALS</h2>
        </div>
        <div className='testimonial'>
          {links.map((link) => {
            return (
              <section className='testimonial-single' key={link.id}>
                <img src={link.image} alt="testimonial image" />
                <p><b>{link.name}</b></p>
                <p>{link.occupation}</p>
                {/* <p>{link.title}</p> */}
                <p>{link.description}</p>
              </section>
            );
          })}
        </div>
      </div>

      <div id="contact">
        <TestForm />
        <i
          onClick={onIconClick}
          className="bx bx-chevrons-up bx-tada-hover bx-md"
        ></i>
      </div>

      <footer>
          <p>
            MODE-EL &#169; 2022
          </p>
      </footer>
    </div>
  );
}

// console.log(process.env.apiKey)

export const getServerSideProps = async () => {
  // const xata = await getXataClient();
  const xata = new XataClient({ apiKey: process.env.apiKey });
  const links = await xata.db.clients.getAll();

  return {
    props: {
      links,
    },
  };
};
