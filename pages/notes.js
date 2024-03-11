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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Notes() {
  const [notes, setNotes] = useState();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://paace-f178cafcae7b.nevacloud.io/api/notes"
      );
      const listNotes = await res.json();
      setNotes(listNotes);
    }
    fetchData();
  }, []);

  return (
    <>
      <Layout metaTitle="asdasd">
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
                  <CardFooter>
                    <Button flex="1" variant="ghost" colorScheme="blue">
                      Edit
                    </Button>
                    <Button flex="1" variant="ghost" colorScheme="red">
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Flex>
      </Layout>
    </>
  );
}

// // export async function getStaticProps() {
//   const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
//   const notes = await res.json();
//   return { props: { notes } };
// }
