const axios = require('axios')
const MockAdapter = require("axios-mock-adapter")
const { makeGet } = require('../js/httpHandler')

let axiosMock = new MockAdapter(axios)

it("Retorna o resultado do valor pesquisado", async () => {
    let dataMock = [
        {
            id: 1,
            titulo: "shakugan",
            data_lancamento: "02-06-2020",
        },
        {
            id: 2,
            titulo: "shakugan II",
            data_lancamento: "25-12-2022",
        },
    ]

    axiosMock.onGet().reply(200, dataMock)

    let titulo = await makeGet()
    expect(titulo[0].titulo).toEqual("shakugan")
})