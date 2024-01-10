// import { Server as NetServer } from "http";
// import { NextApiRequest } from "next";
// import { Server as ServerIO } from "socket.io";

// import { NextApiResponseServerIo } from "@/types";

// export const config = {
//   api: {
//     bodyParser: false
//   }
// };

// /**
//  * Handles incoming requests for the Next.js API route responsible for initializing
//  * and managing a WebSocket server using the 'socket.io' library.
//  */
// function ioHandler(req: NextApiRequest, res: NextApiResponseServerIo) {
//   if (!res.socket.server.io) {
//     const path = "/api/server/io";
//     const httpServer: NetServer = res.socket.server as any;
//     const io = new ServerIO(httpServer, {
//       path,
//       addTrailingSlash: false
//     });
//     res.socket.server.io = io;
//   }

//   res.end();
// }

// export default ioHandler;



import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIo } from "@/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    });
    res.socket.server.io = io;
  }

  res.end();
}

export default ioHandler;
