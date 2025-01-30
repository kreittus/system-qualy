// import { useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import { Snackbar, Alert, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Checkbox } from '@mui/material';

// const CookieConsent = () => {
//   const [open, setOpen] = useState(false);
//   const [preferencesOpen, setPreferencesOpen] = useState(false);
//   const [essentialCookies, setEssentialCookies] = useState(true);
//   const [analyticsCookies, setAnalyticsCookies] = useState(false);

//   useEffect(() => {
//     const consent = Cookies.get('cookie_consent');
//     if (!consent) {
//       setOpen(true);
//     }
//   }, []);

//   const handleAcceptAll = () => {
//     Cookies.set('cookie_consent', JSON.stringify({
//       essential: true,
//       analytics: true,
//     }), { expires: 365 });
//     setOpen(false);
//     setPreferencesOpen(false);
//   };

//   const handleAcceptEssential = () => {
//     Cookies.set('cookie_consent', JSON.stringify({
//       essential: true,
//       analytics: false,
//     }), { expires: 365 });
//     setOpen(false);
//     setPreferencesOpen(false);
//   };

//   const handleDecline = () => {
//     Cookies.set('cookie_consent', JSON.stringify({
//       essential: true,
//       analytics: false,
//     }), { expires: 365 });
//     setOpen(false);
//     setPreferencesOpen(false);
//   };

//   const handleOpenPreferences = () => {
//     setPreferencesOpen(true);
//   };

//   const handleClosePreferences = () => {
//     setPreferencesOpen(false);
//   };

//   return (
//     <>
//       <Snackbar
//         open={open}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//       >
//         <Alert
//           severity="info"
//           sx={{
//             width: '100%',
//             backgroundColor: '#333',
//             color: '#fff',
//             alignItems: 'center',
//           }}
//           action={
//             <Stack direction="row" spacing={1}>
//               <Button
//                 variant="contained"
//                 color="success"
//                 onClick={handleAcceptAll}
//                 size="small"
//               >
//                 Aceitar Todos
//               </Button>
//               <Button
//                 variant="contained"
//                 color="info"
//                 onClick={handleOpenPreferences}
//                 size="small"
//               >
//                 Preferências de Cookies
//               </Button>
//               <Button
//                 variant="contained"
//                 color="error"
//                 onClick={handleDecline}
//                 size="small"
//               >
//                 Recusar
//               </Button>
//             </Stack>
//           }
//         >
//           Este sistema utiliza cookies para melhorar sua experiência. Você aceita?
//         </Alert>
//       </Snackbar>

//       {/* Modal de Preferências */}
//       <Dialog open={preferencesOpen} onClose={handleClosePreferences}>
//         <DialogTitle>Preferências de Cookies</DialogTitle>
//         <DialogContent>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={essentialCookies}
//                 disabled
//               />
//             }
//             label="Cookies Essenciais (Obrigatórios)"
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={analyticsCookies}
//                 onChange={(e) => setAnalyticsCookies(e.target.checked)}
//               />
//             }
//             label="Cookies de Análise"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleAcceptEssential} color="primary">
//             Aceitar Apenas Essenciais
//           </Button>
//           <Button onClick={handleAcceptAll} color="success" variant="contained">
//             Aceitar Todos
//           </Button>
//           <Button onClick={handleClosePreferences} color="error">
//             Cancelar
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default CookieConsent;
