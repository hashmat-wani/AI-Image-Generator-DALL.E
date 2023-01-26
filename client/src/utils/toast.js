export const toaster = (
  toast,
  title,
  description,
  status,
  duration = 5000,
  isClosable = true,
  position = "top-right"
) =>
  toast({
    title,
    description,
    status,
    duration,
    isClosable,
    position,
  });

// function Toast() {
//   const toast = useToast();
//   // const statuses = ['success', 'error', 'warning', 'info']

//   return (
//     <Wrap>
//       {statuses.map((status, i) => (
//         <WrapItem key={i}>
//           <Button
//             onClick={() =>
//               toast({
//                 title: `${status} toast`,
//                 status: status,
//                 isClosable: true,
//               })
//             }
//           >
//             Show {status} toast
//           </Button>
//         </WrapItem>
//       ))}
//     </Wrap>
//   );
// }
