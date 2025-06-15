import Image from "next/image";
import {Flex, Text, Strong, Em, Link, Code} from "@radix-ui/themes";

export default function Home() {
  return (
    <Flex direction="column" align="center" justify="center" height="100vh" width="100vw">
      <Flex direction="row" align="center" justify="center" height="100vh" width="50%" gap="2">
        <Image src="/logo.png" alt="CryptoCashControl" width={160} height={160} />
        <Flex direction="column" align="start" justify="start" gap="2">
          <Text>Hi, this is <Strong>Crypto Cash Control !!</Strong> </Text>
          <Text>Our public cryptocurrency trading platform is currently in the process of being developed and <Code>will be officially released</Code> in the near future.</Text>
          <Text>We kindly invite you to look forward to its release, Follow <Em><Link href="https://x.com/CryptoCashCtrl">@CryptoCashCtrl</Link></Em> for more information.</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
