CREATE DATABASE facturacion;
USE facturacion;

CREATE TABLE TblClientes (
    id INT PRIMARY KEY,
    RazonSocial VARCHAR(200),
    IdTipoCliente INT,
    FechaCreacion DATE,
    RFC VARCHAR(50)
);

CREATE TABLE TblFacturas (
    id INT PRIMARY KEY,
    FechaEmisionFactura DATETIME,
    IdCliente INT,
    NumeroFactura INT,
    NumeroTotalArticulos INT,
    SubTotalFactura DECIMAL(18, 2),
    TotalImpuesto DECIMAL(18, 2),
    TotalFactura DECIMAL(18, 2),
    FOREIGN KEY (IdCliente) REFERENCES TblClientes(id)
);

CREATE TABLE TblDetallesFactura (
    id INT PRIMARY KEY,
    IdFactura INT,
    IdProducto INT,
    CantidadDeProducto INT,
    PrecioUnitarioProducto DECIMAL(18, 2),
    SubtotalProducto DECIMAL(18, 2),
    Notas VARCHAR(200),
    FOREIGN KEY (IdFactura) REFERENCES TblFacturas(id)
);

CREATE TABLE CatProductos (
    id INT PRIMARY KEY,
    NombreProducto VARCHAR(50),
     ImagenProducto BLOB,
    PrecioUnitario DECIMAL(18, 2),
    iva VARCHAR(5)
);

CREATE TABLE CatTipoCliente (
    id INT PRIMARY KEY,
    TipoCliente VARCHAR(50)
);
			