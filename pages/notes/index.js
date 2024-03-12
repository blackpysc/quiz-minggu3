import Layout from "@/layout";
import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Notes() {
  const [notes, setNotes] = useState();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const listNotes = await (
        await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes")
      ).json();
      setNotes(listNotes);
    }
    fetchData();
  }, []);

  return (
    <>
      <Layout metaTitle="asdasd">
        <Box padding="5">
          <Flex justifyContent="end">
            <Button
              colorScheme="green"
              onClick={() => router.push("notes/add")}
            >
              add Notes
            </Button>
          </Flex>
          <Flex>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              {notes?.data?.map((item) => (
                <GridItem>
                  <Card>
                    <CardHeader>
                      <Heading>{item?.title}</Heading>
                      <CardBody>
                        <Text>{item?.description}</Text>
                      </CardBody>
                    </CardHeader>
                    <CardFooter justify="space-between" flexWrap="wrap">
                      <Button
                        flex="1"
                        colorScheme="blue"
                        onClick={() => router.push("/notes/edit")}
                      >
                        Edit
                      </Button>
                      <Button
                        flex="1"
                        colorScheme="red"
                        onClick={() => router.push("/notes/delete")}
                      >
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </Flex>
        </Box>
      </Layout>
    </>
  );
}

// // export async function getStaticProps() {
//   const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
//   const notes = await res.json();
//   return { props: { notes } };
// }
