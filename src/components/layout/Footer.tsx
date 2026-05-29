import { C, font } from "@/lib/tokens";

export function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "20px 32px",
        fontSize: 12,
        color: C.t3,
        fontFamily: font,
      }}
    >
      Fuente: API ChileCompra · Datos simulados con fines demostrativos
    </footer>
  );
}
