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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from "react";

export default function Notes() {
  const [notes, setNotes] = useState();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAddOpen, onAddOpen, onAddClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const HandleSubmit = async () => {
    try {
      const result = await (
        await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notes),
        })
      ).json();
      if (result?.success) {
        router.push("/notes");
      }
    } catch (error) {}
  };

  const HandleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://paace-f178cafcae7b.nevacloud.io/api/notes/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (result?.success) {
        router.reload();
      }
    } catch (error) {}
  };

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
            <Button variant="ghost" colorScheme="green" onClick={onAddOpen}>
              Catatan Baru
            </Button>
            <Modal
              isOpen={isAddOpen}
              onClose={onAddClose}
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Tambah Catatan Baru</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>title</FormLabel>
                    <Input
                      ref={initialRef}
                      placeholder="title"
                      type="text"
                      onChange={(event) =>
                        setNotes({ ...notes, title: event.target.value })
                      }
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>description</FormLabel>
                    <Input
                      placeholder="description"
                      onChange={(event) =>
                        setNotes({ ...notes, description: event.target.value })
                      }
                    />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    variant="ghost"
                    colorScheme="green"
                    mr={3}
                    onClick={() => HandleSubmit()}
                  >
                    Tambahkan
                  </Button>
                  <Button onClick={onAddClose}>Kembali</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>
          <Flex>
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
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
                        variant="ghost"
                        colorScheme="blue"
                        onClick={() => router.push(`/notes/edit/${item?.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        flex="1"
                        variant="ghost"
                        colorScheme="red"
                        onClick={onOpen}
                      >
                        Delete
                      </Button>
                      <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Hapus catatan</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <Text>
                              Apakah Kamu ingin menghapus catatan {item?.title}
                            </Text>
                          </ModalBody>

                          <ModalFooter margin="6" padding="5" gap="3">
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                              Kembali
                            </Button>
                            <Button
                              colorScheme="red"
                              mr={3}
                              onClick={() => HandleDelete(item?.id)}
                            >
                              Hapus
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
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
