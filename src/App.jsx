/*import VeyondTech from "./veyondtech/veyondtech";

export default function App() {
  return <VeyondTech />;
}*/

import { BrowserRouter } from "react-router-dom";
import VeyondTech from "./veyondtech/veyondtech";

export default function App() {
  return (
    <BrowserRouter>
      <VeyondTech />
    </BrowserRouter>
  );
}

