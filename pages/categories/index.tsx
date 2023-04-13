import { MantineListInferencer } from "@refinedev/inferencer/mantine";
import { GetServerSideProps } from "next";

export default function CategoryList() {
  return <MantineListInferencer />;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  return {
    props: {},
  };
};
