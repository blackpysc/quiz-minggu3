import dynamic from "next/dynamic";
import {
  Grid,
  GridItem,
  Card,
  Heading,
  Text,
  Button,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from "react";

export default function AddNotes() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const router = useRouter();
  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });

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

  return (
    <>
      <Card margin="5" padding="5">
        <Heading>Add Notes</Heading>
        <Grid gap="5">
          <GridItem>
            <Text>Title</Text>
            <Input
              type="text"
              onChange={(event) =>
                setNotes({ ...notes, title: event.target.value })
              }
            />
          </GridItem>
          <GridItem>
            <Text>Description</Text>
            <Textarea
              onChange={(event) =>
                setNotes({ ...notes, description: event.target.value })
              }
            />
          </GridItem>
          <GridItem>
            <Button onClick={() => HandleSubmit()} colorScheme="blue">
              Submit
            </Button>
          </GridItem>
        </Grid>
      </Card>
    </>
  );
}
