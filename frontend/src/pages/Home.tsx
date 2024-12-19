import { Container, Post } from "@/components";
import axios from "axios";
function Home() {
  return (
    <Container>
      <div className="">
        <Post />
      </div>
    </Container>
  );
}

export default Home;
