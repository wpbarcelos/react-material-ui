import React, { useState, useEffect, useMemo } from "react";
import {
  TextField,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";

import api from "../services/api";

const baseURL =
  "https://gist.githubusercontent.com/wpbarcelos/b77b2429999a855062f267ab848fc8bc/raw/62f64b92aea8d8fd957563d59bd28c53601ec7a7/material-ui.json";

export default function Osticket() {
  const [data, setData] = useState([]);

  const [filter, setFilter] = useState({
    projetoId: "",
    osNumber: "",
    description: "",
    status: "",
    discipline: "",
    author: "",
    ownerState: "",
  });

  const dataFiltered = useMemo(
    function () {
      if (Object.entries(filter).every(([_, value]) => value == "")) {
        return data;
      } else {
        const entries = Object.entries(filter);
        return data.filter((item) => {
          return entries.some(([key, value]) => {
            return (
              value != "" &&
              item[key] != "" &&
              RegExp(value, "i").test(item[key])
            );
          });
        });
      }
    },
    [data, filter]
  );

  useEffect(function () {
    getData();
  }, []);

  async function getData() {
    const { data } = await api.get("");
    setData(
      data.payload.ordens.map((item) => ({
        id: item.IdOS,
        projetoId: item.Projeto.ProjetoCode,
        osId: item.IdOS,
        osNumber: item.OSNumero,
        description: item.DescResumida,
        status: item.OSStatus.DescStatus,
        statusColor: item.OSStatus.Cor,
        discipline: item.PlanoDeTrabalho.Disciplina.DescDisciplina,
        stage: item?.OSEtapas[0].EAP.NomeEtapa,
        stateStart: item?.OSEtapas[0].DataInicio,
        stateFinish: item?.OSEtapas[0].DataFim,
        ownerState: item?.OSEtapas[0].Responsavel.NomUsu,
        author: item.Solicitante.NomUsu,
      }))
    );
  }
  const columns = [
    { field: "osId", headerName: "Os TIcket", type: "number" },
    { field: "projetoId", headerName: "Projeto ID", width: 180 },
    { field: "description", headerName: "Descrição", width: 220 },
    { field: "status", headerName: "status" },
    { field: "discipline", headerName: "Disciplina" },
    { field: "stateStart", headerName: "Início" },
    { field: "stateFinish", headerName: "Término" },
    { field: "stage", headerName: "Stage" },
    { field: "author", headerName: "Solicitante", width: 170 },
    { field: "ownerState", headerName: "Responsável", width: 170 },
  ];

  function changeFilter(field, value) {
    setFilter({ ...filter, [field]: value });
  }
  return (
    <>
      <div style={styles.rowFilter}>
        <TextField
          label="OS Ticket"
          onChange={(ev) => changeFilter("osNumber", ev.target.value)}
        ></TextField>
        <TextField
          label="ID Projeto"
          onChange={(ev) => changeFilter("projetoId", ev.target.value)}
        ></TextField>
        <TextField
          label="Descrição"
          onChange={(ev) => changeFilter("description", ev.target.value)}
        ></TextField>
        <TextField
          label="Status"
          onChange={(ev) => changeFilter("status", ev.target.value)}
        ></TextField>
        <TextField
          label="Solicitante"
          onChange={(ev) => changeFilter("author", ev.target.value)}
        ></TextField>
        <TextField
          label="Responsável"
          onChange={(ev) => changeFilter("ownerState", ev.target.value)}
        ></TextField>
      </div>

      <div
        style={{
          height: 400,
          marginTop: 20,
          width: "100%",
        }}
      >
        <Table style={{ backgroundColor: "#fff" }}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.field}>
                  {col.headerName.toUpperCase()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataFiltered.map((item) => (
              <TableRow key={`${item.id}`}>
                {columns.map((col) => {
                  if (col.field == "status") {
                    return (
                      <TableCell>
                        <span
                          style={{
                            color: item.statusColor,
                            fontWeight: "bold",
                            fontSize: 12,
                          }}
                        >
                          {item.status}
                        </span>
                      </TableCell>
                    );
                  }
                  if (col.field == "stateStart" || col.field == "stateFinish") {
                    return (
                      <TableCell style={{ fontSize: 12 }}>
                        {item[col.field]
                          .split("T")[0]
                          .split("-")
                          .reverse()
                          .join("/")}
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell style={{ fontSize: 12 }}>
                      {item[col.field]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <div
              style={{
                height: 400,
                marginTop: 20,
                width: "100%",
              }}
            >
            <DataGrid
                    rows={dataFiltered}
                    columns={columns}
                    pageSize={5}
                    disableSelectionOnClick={true}
                  />
            </div> */}
      </div>
    </>
  );
}

const styles = {
  rowFilter: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
};
