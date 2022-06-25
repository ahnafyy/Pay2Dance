import styled from "@emotion/styled";

import Image from "./Image";
import DancePackageQuantity from "./DancePackageQuantity";

const Shop = styled.div`
  padding: 10px 20px 40px 20px;
`;

const ShopName = styled.h1`
  font-size: 18px;
  color: #fff;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  line-height: 26.4px;
  text-align:center;
  text-align: center;
`;

const DemoDebitCardDetails = styled.h4`
  font-size: 10px; 
  color: #fff;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  line-height: 26.4px;
  text-align:center;
  text-align: center;
`;

const Controls = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

/**
 * DancePackage is a function that takes in an object with three properties: onAddDancePackage,
 * onRemoveDancePackage, and numDancePackages. 
 * 
 * The function returns a Shop component with a ShopName, Image, and Controls. 
 * 
 * The Controls component contains a DancePackageQuantity component. 
 * 
 * The DancePackageQuantity component takes in an object with three properties: onAdd, onRemove, and
 * quantity. 
 * 
 * The DancePackageQuantity component returns a div with a button and a span. 
 * 
 * The button has an onClick property that calls the onAdd function. 
 * 
 * The span contains the quantity. 
 * 
 * The button has an onClick property that calls the onRemove function.
 * @returns The DancePackage component is being returned.
 */

const DancePackage = ({ onAddDancePackage, onRemoveDancePackage, numberOfDancePackages }) => {
  return (
    <Shop>
      <ShopName>🕺 Pay 2 Dance 💃</ShopName>
      <DemoDebitCardDetails>
        For demo use 4242 4242 4242 4242 for debit card to not be charged and pass validations.
        </DemoDebitCardDetails>
      <Image src="./DancePackage.png" width="100px"></Image>
      <Controls>
        <DancePackageQuantity
          onAdd={onAddDancePackage}
          onRemove={onRemoveDancePackage}
          quantity={numberOfDancePackages}
        />
      </Controls>
    </Shop>
  );
};

export default DancePackage;
