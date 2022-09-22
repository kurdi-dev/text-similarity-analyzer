import Head from 'next/head';
import { useState } from 'react';
import {
  Container,
  VStack,
  StackDivider,
  Box,
  Center,
  Input,
  Flex,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import similarity from 'string-cosine-similarity';
import trigramSimilarity from 'trigram-similarity';
import { distance as levenshteinDistance } from 'fastest-levenshtein';
import distance from 'jaro-winkler';
import { compareTwoStrings } from 'string-similarity';

import * as Similarity from 'string-comparison';

function RenderTableRow({ obj }) {
  return (
    <Tr>
      <Td>{obj.firstText}</Td>
      <Td>{obj.secondText}</Td>
      <Td isNumeric>{obj.cosineSimilarityRatio.toFixed(3)}</Td>
      <Td isNumeric>{obj.JaccardIndexRatio.toFixed(3)}</Td>
      <Td isNumeric>{obj.lcsRatio.toFixed(3)}</Td>
      <Td isNumeric>{obj.levenshteinDistanceSimilarityRatio.toFixed(3)}</Td>
      <Td isNumeric>{obj.mlcsRatio.toFixed(3)}</Td>
      <Td isNumeric>{obj.diceCoefficientRatio.toFixed(3)}</Td>
    </Tr>
  );
}

export default function Home() {
  const [isComparing, setIsComparing] = useState(false);
  const [firstText, setFirstText] = useState('');
  const [secondText, setSecondText] = useState('');
  const [tableRows, setTableRows] = useState([]);

  const handleOnClickCompare = async () => {
    setIsComparing(true);

    // let cosineSimilarityRatio = similarity(firstText, secondText);
    // let trigramSimilarityRatio = trigramSimilarity(firstText, secondText);
    // let jaroWinklerSimilarityRatio = distance(firstText, secondText);
    // let levenshteinDistanceSimilarityRatio = levenshteinDistance(firstText, secondText);
    // let diceCoefficientRatio = compareTwoStrings(firstText, secondText);

    let cosineSimilarityRatio = Similarity.cosine.similarity(
      firstText,
      secondText,
    );
    let JaccardIndexRatio = Similarity.jaccardIndex.similarity(
      firstText,
      secondText,
    );
    let lcsRatio = Similarity.lcs.similarity(firstText, secondText);
    let levenshteinDistanceSimilarityRatio = Similarity.levenshtein.similarity(
      firstText,
      secondText,
    );
    let diceCoefficientRatio = compareTwoStrings(firstText, secondText);
    let mlcsRatio = Similarity.mlcs.similarity(firstText, secondText);

    setTableRows((prevRows) => [
      ...prevRows,
      {
        firstText,
        secondText,
        cosineSimilarityRatio,
        JaccardIndexRatio,
        lcsRatio,
        levenshteinDistanceSimilarityRatio,
        mlcsRatio,
        diceCoefficientRatio,
      },
    ]);

    setIsComparing(false);
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta
          name='description'
          content='Generated by create next app'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>

      <main>
        <Container maxW='4xl'>
          <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={4}
            align='stretch'
          >
            <Box
              mt={25}
              w='100%'
              bg='yellow.200'
            >
              <Center p={5}>
                This is a simple tool to compare two texts using different text
                comparison algorithms, you can analyze the comparition ratios to
                find the best algorithm for your case.
              </Center>
            </Box>
            <Box w='100%'>
              <Flex
                justify='space-between'
                alignItems='center'
                gap={2}
              >
                <Box w='100%'>
                  <Input
                    placeholder='first text'
                    value={firstText}
                    onChange={(e) => setFirstText(e.target.value)}
                  />
                </Box>
                <Box w='100%'>
                  <Input
                    placeholder='second text'
                    value={secondText}
                    onChange={(e) => setSecondText(e.target.value)}
                  />
                </Box>
                <Box>
                  <Button
                    isLoading={isComparing}
                    onClick={handleOnClickCompare}
                    loadingText='Comparing'
                    colorScheme='teal'
                    size='md'
                  >
                    Compare
                  </Button>
                </Box>
              </Flex>
            </Box>
            <Box w='100%'>
              <TableContainer>
                <Table
                  variant='simple'
                  size='sm'
                >
                  <Thead>
                    <Tr>
                      <Th>First Text</Th>
                      <Th>Second Text</Th>
                      <Th isNumeric>Cosine</Th>
                      <Th isNumeric>Jaccard Index</Th>
                      <Th isNumeric>LCS</Th>
                      <Th isNumeric>Levenshtein</Th>
                      <Th isNumeric>MLCS</Th>
                      <Th isNumeric>Dice CoefficientRatio</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {tableRows.map((row, index) => (
                      <RenderTableRow
                        obj={row}
                        key={index}
                      />
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </VStack>
        </Container>
      </main>

      <footer></footer>
    </div>
  );
}
