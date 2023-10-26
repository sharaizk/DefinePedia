import Head from 'next/head'
import Page from "src/components/shared/Page";
import { makeStyles } from "@material-ui/styles";
import HeroSection from "src/components/landing-page/HeroSection";
import InfoSection from "src/components/landing-page/InfoSection";
import CategorySection from "src/components/landing-page/CategorySection";
import MemberSection from "src/components/landing-page/MemberSection";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    paddingTop: "2vh",
  },
  container: {
    minHeight: "100%",
    padding: "0 5.5rem",
    [theme.breakpoints.between("md", "md")]: {
      padding: "0 2rem",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0 1rem",
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Homepage">
      <div className={classes.container}>
        <Head>
          <title>Definepedia</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <HeroSection />
        <InfoSection
          leftToRight={true}
          img={"/images/section2.png"}
          imgClass={'smallImg'}
          title="HOMEWORK"
          heading="Get the Best Homework Help"
          detail="Do you need help with your homework? You're not alone. Many Students
          struggle with their homework,especially when it comes to complex
          topics like math and science. That's where we come in. We provide over
          1million step-by-step solutions to textbooks and offer expert help
          from our team of tutors 24/7. We have a library of resources that can
          help you better understand difficult concepts. So whatever your
          homework needs may be, we have you covered."
          linkTitle="Get Started"
          to="/"
        />
        <InfoSection
          leftToRight={false}
          img={"/images/section3.png"}
          imgClass={'largeImg'}
          heading={(<><span>95% Students</span> get Better Grades with Definepedia</>)}
          detail="According to recent study, 95% of students who use Definepedia get
          better results in their classes. We provide a wealth of information on
          thousands of topics, which helps students learn and understand complex
          concepts quickly and easily. If you're looking for a way to boost your
          grades this semester, be sure to check out Definepedia"
          linkButton="Learn More"
        />
        <InfoSection
          leftToRight={true}
          imgClass={'smallImg'}
          img={"/images/section4.png"}
          title="TUTORS"
          heading="24/7 Online Tutors"
          detail="We provide 24/7 online tutors for students of all ages and
          subject. Whether you need help with Math, Science, Accounting, or
          anything else. We have a tutor who can help! Our tutors are
          experienced professionals who will work with you one-on-one to
          make sure you understand the material and achieve your goals"
          linkTitle="Learn More"
          to="/"
        />
        <CategorySection />
        <MemberSection />
      </div>
    </Page>
  );
}

export async function getServerSideProps(context) {

  console.log({ 'dpeida-token': context.req.cookies["dpedia-token"] })
  return {
    props: {

    }
  }
}
