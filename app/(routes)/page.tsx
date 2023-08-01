import React from "react";

import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getBillboard from "@/actions/get-billboards";

export const revalidate = 0;

const HomePage = async () => {
  const billboard = await getBillboard("f81a927b-84af-4dc0-b084-5ec234b97542");

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
      </div>
    </Container>
  );
};

export default HomePage;
