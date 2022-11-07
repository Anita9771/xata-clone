import type { InferGetServerSidePropsType } from "next";
import { XataClient, getXataClient } from "../utils/xata.codegen";
import Head from "next/head";
import { TestForm } from "../components/TestForm";
import dotenv from "dotenv";
import Link from "next/link";
dotenv.config();

export default function IndexPage({
  // add the props in this case links
  links,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {



  
  // scroll to top
  const onBtnClick = (e) => {
    e.preventDefault();
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("contact").offsetTop - 60,
        behavior: "smooth",
      });
    }, 50);
  };

  // scroll to top
  const onIconClick = (e) => {
    e.preventDefault();
   
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("contactBtn").offsetTop - 60,
        behavior: "smooth",
      });
    }, 50);
  };

  // Some UI rendering
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

// fetching db from xata
export const getServerSideProps = async () => {
  const xata = new XataClient({ apiKey: process.env.apiKey });
  const links = await xata.db.clients.getAll();

  return {
    props: {
      links,
    },
  };
};
