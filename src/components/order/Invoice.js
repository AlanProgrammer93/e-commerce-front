import React from 'react'
import {
    Document,
    Page,
    Text,
    StyleSheet,
} from '@react-pdf/renderer';
import { 
    Table, 
    TableHeader, 
    TableCell, 
    TableBody, 
    DataTableCell 
} from '@david.kucsai/react-pdf-table';

const Invoice = ({ order }) => {
    return (
        <Document>
            <Page style={ styles.body }>
                <Text style={styles.header} fixed>
                    ~ {new Date().toLocaleString()} ~
                </Text>
                <Text style={styles.title}>Factura</Text>
                <Text style={styles.author}>E-commerce</Text>
                <Text style={styles.subtitle}>Detalles De La Orden De Compra</Text>

                <Table>
                    <TableHeader>
                        <TableCell>Titulo</TableCell>
                        <TableCell>Precio</TableCell>
                        <TableCell>Cantidad</TableCell>
                        <TableCell>Marca</TableCell>
                        <TableCell>Color</TableCell>
                    </TableHeader>
                </Table>

                <Table data={order.products}>
                    <TableBody>
                        <DataTableCell getContent={(x) => x.product.title} />
                        <DataTableCell getContent={(x) => `$${x.product.price}`} />
                        <DataTableCell getContent={(x) => x.count} />
                        <DataTableCell getContent={(x) => x.product.brand} />
                        <DataTableCell getContent={(x) => x.color} />
                    </TableBody>
                </Table>

                <Text style={styles.text}>
                    <Text>
                        Fecha: Fecha de compra{/* {new Date(order.paymentIntent.created * 1000).toLocaleString()} */}
                    </Text>
                    {"/n"}
                    <Text>
                        ID De Orden: {/* {order.paymentIntent.id} */} {order._id}
                    </Text>
                    {"/n"}
                    <Text>
                        Estado: {order.orderStatus}
                    </Text>
                    {"/n"}
                    <Text>
                        Total Pagado: {/* {order.paymentIntent.amount} */} $$$$
                    </Text>
                </Text>

                <Text style={styles.footer}> ~ Gracias Por Tu Compra ~ </Text>
            </Page>
        </Document>
    )
}

const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
    },
    author: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: "justify",
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    footer: {
      padding: "100px",
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
  });

export default Invoice
