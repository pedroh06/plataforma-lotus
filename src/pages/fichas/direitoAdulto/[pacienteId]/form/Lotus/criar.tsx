/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { RecordLayout } from "@/components/layouts/RecordLayout";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Medicina() {
  const router = useRouter();
  const { pacienteId } = router.query;

  const [residents, setResidents] = useState([]);
  const [resident, setResident] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCreateForm, setIsLoadingCreateForm] = useState(false);

  const [formData, setFormDate] = useState({
    road: "",
    houseNumber: "",
    neighborhood: "",
    city: "",
    uf: "",
    email: "",
    immobile: "",
    cnpj: "",
    demand: [""],
    others: "",
    observations: "",
    forwarding: [""],
    other: "", 
  });

  React.useEffect(() => {
    if (!pacienteId) {
      return;
    }

    const getResident = async () => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      try {
        const residentsRaw = await fetch("/api/residente");
        const residents = await residentsRaw.json();
        setResidents(residents);

        const response = await fetch(`/api/residente/${pacienteId}`);

        if (!response.ok) {
          console.log("deu erro");
          return;
        }

        const resident = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument

        setResident({
          ...resident,
          birthDate: new Date(resident.birthDate),
          responsible: {
            id: resident.responsibleId,
            name: resident.responsibleId,
          },
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getResident();
  }, [pacienteId]);

  if (isLoading) {
    return (
      <RecordLayout>
        <div className="flex w-full flex-col items-center justify-center gap-4 rounded-md bg-white px-4 py-16 shadow-2xl sm:w-[600px]">
          <Loader2 className=" h-32 w-32 animate-spin" color="purple" />
        </div>
      </RecordLayout>
    );
  }

  const handleSubmit = async (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    // e.preventDefault();

    try {
      setIsLoadingCreateForm(true);
      await axios.post("/api/fichas/direitoAdulto", {
        userId: pacienteId,
        ...formData,
      });

      toast.success("Realizado com sucesso com sucesso!");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      toast.error("Erro ao registrar!");
    } finally {
      setIsLoadingCreateForm(false);
    }
  };

  return (
    <RecordLayout>
      <div className="my-4 flex w-full flex-col items-center justify-center gap-4 rounded-md bg-white px-4 py-16 shadow-2xl sm:w-[600px]">
        <h1 className="bold text-xl">Direito (Adulto)</h1>

        <div className="relative flex w-full flex-col gap-4 px-2 pt-8">
          <button
            className="absolute left-0 top-0 flex items-center
              gap-1 text-sm text-gray-400"
            onClick={() => router.back()}
          >
            <ChevronLeftIcon className="h-6 w-6" />
            Voltar
          </button>

          <ProfileUser user={resident} residents={residents} />

          <form className="flex w-full flex-col gap-7" onSubmit={handleSubmit}>

            <div className="flex flex-col gap-1">
              <Text>Rua:</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.road}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    road: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Nº da Casa:</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.houseNumber}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    houseNumber: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Bairro:</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.neighborhood}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    neighborhood: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Cidade:</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.city}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    city: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>UF:</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.uf}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    uf: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Email:</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.email}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Imóvel:</label>
              </Text>

              <RadioGroup
                value={formData.immobile}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    immobile: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Próprio" control={<Radio />} label="Próprio" />
                <FormControlLabel value="Alugado" control={<Radio />} label="Alugado" />
                <FormControlLabel value="Emprestado" control={<Radio />} label="Emprestado" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Possui CNPJ?</label>
              </Text>

              <RadioGroup
                value={formData.cnpj}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    cnpj: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Não" control={<Radio />} label="Sim" />
                <FormControlLabel value="Sim" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Demanda:</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Aposentadoria"
                  checked={formData.demand.includes("Aposentadoria")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        demand: [...formData.demand, "Aposentadoria"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        demand: formData.demand.filter((item) => item !== "Aposentadoria"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Aposentadoria"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Aposentadoria
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="AlvaraJudicial"
                  checked={formData.demand.includes("AlvaraJudicial")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        demand: [...formData.demand, "AlvaraJudicial"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        demand: formData.demand.filter((item) => item !== "AlvaraJudicial"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="AlvaraJudicial"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Alvará Judicial
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="BeneficioAssistencial"
                  checked={formData.demand.includes("BenefícioAssistencial")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        demand: [...formData.demand, "BenefícioAssistencial"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        demand: formData.demand.filter((item) => item !== "BenefícioAssistencial"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="BenefícioAssistencial(BPC/LOAS)"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Benefício Assistencial (BPC/LOAS)
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="CertidãoDeMatriculaDeImovel"
                  checked={formData.demand.includes("CertidãoDeMatriculaDeImovel")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        demand: [...formData.demand, "CertidãoDeMatriculaDeImovel"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        demand: formData.demand.filter((item) => item !== "CertidãoDeMatriculaDeImovel"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="CertidaoDeMatriculaDeImovel"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Certidão de Matrícula de Imóvel
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="ContestaçãoDePaternidade"
                  checked={formData.demand.includes("ContestaçãoDePaternidade")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        demand: [...formData.demand, "ContestaçãoDePaternidade"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        demand: formData.demand.filter((item) => item !== "ContestaçãoDePaternidade"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="ContestaçãoDePaternidade"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Contestação de Paternidade
                </label>
              </div>


              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="CobrançaIndevida"
                  checked={formData.demand.includes("CobrançaIndevida")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        demand: [...formData.demand, "CobrançaIndevida"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        demand: formData.demand.filter((item) => item !== "CobrançaIndevida"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="CobrançaIndevida"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Cobrança Indevida
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="Curatela"
                  checked={formData.demand.includes("Curatela")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        demand: [...formData.demand, "Curatela"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        demand: formData.demand.filter((item) => item !== "Curatela"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Curatela"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Curatela
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Divorcio"
                  checked={formData.demand.includes("Divórcio")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        demand: [...formData.demand, "Divórcio"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        demand: formData.demand.filter((item) => item !== "Divórcio"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Divórcio"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Divórcio
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="EmissaoDeDocumentos"
                  checked={formData.demand.includes("EmissaoDeDocumentos")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        demand: [...formData.demand, "EmissaoDeDocumentos"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        demand: formData.demand.filter((item) => item !== "EmissaoDeDocumentos"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="EmissaoDeDocumentos"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Emissão de Documentos
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="ExoneracaoDePensaoAlimenticia"
                  checked={formData.demand.includes("ExoneracaoDePensaoAlimenticia")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        demand: [...formData.demand, "ExoneracaoDePensaoAlimenticia"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        demand: formData.demand.filter((item) => item !== "ExoneracaoDePensaoAlimenticia"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="ExoneracaoDePensaoAlimenticia"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Exoneração de Pensão Alimentícia
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="PensaoPorMorte"
                  checked={formData.demand.includes("PensaoPorMorte")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        demand: [...formData.demand, "PensaoPorMorte"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        demand: formData.demand.filter((item) => item !== "PensaoPorMorte"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="PensaoPorMorte"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Pensão por morte
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Usucapiao"
                  checked={formData.demand.includes("Usucapiao")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        demand: [...formData.demand, "Usucapiao"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        demand: formData.demand.filter((item) => item !== "Usucapiao"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Usucapiao"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Usucapião
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="reconhecimento_de_União_Estavel"
                  checked={formData.demand.includes("reconhecimento_de_União_Estavel")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        demand: [...formData.demand, "reconhecimento_de_União_Estavel"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        demand: formData.demand.filter((item) => item !== "reconhecimento_de_União_Estavel"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="reconhecimento_de_União_Estavel"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Reconhecimento de União Estável
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="reconhecimento_de_paternidade"
                  checked={formData.demand.includes("reconhecimento_de_paternidade")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        demand: [...formData.demand, "reconhecimento_de_paternidade"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        demand: formData.demand.filter((item) => item !== "reconhecimento_de_paternidade"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="reconhecimento_de_paternidade"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Reconhecimento de Paternidade
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="inventario"
                  checked={formData.demand.includes("inventario")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        demand: [...formData.demand, "inventario"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        demand: formData.demand.filter((item) => item !== "inventario"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="inventario"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Inventário
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="retificacao_de_registro_civil"
                  checked={formData.demand.includes("retificacao_de_registro_civil")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        demand: [...formData.demand, "retificacao_de_registro_civil"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        demand: formData.demand.filter((item) => item !== "retificacao_de_registro_civil"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="retificacao_de_registro_civil"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Retificação de Registro Civil
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="registro_tardio_de_nascimento"
                  checked={formData.demand.includes("registro_tardio_de_nascimento")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        demand: [...formData.demand, "registro_tardio_de_nascimento"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        demand: formData.demand.filter((item) => item !== "registro_tardio_de_nascimento"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="registro_tardio_de_nascimento"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                   Registro Tardio de Nascimento
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="registro_tardio_de_obito"
                  checked={formData.demand.includes("registro_tardio_de_obito")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        demand: [...formData.demand, "registro_tardio_de_obito"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        demand: formData.demand.filter((item) => item !== "registro_tardio_de_obito"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="registro_tardio_de_obito"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Registro Tardio de Óbito
                </label>
              </div>
            </div>
            

            

            <div className="flex flex-col gap-1">
              <Text>Outros:</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.others}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    others: e.target.value,
                  })
                }
              />
            </div>      

            <div className="flex flex-col gap-1">
              <Text>Observações:</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.observations}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    observations: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Encaminhamento</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Medicina"
                  checked={formData.forwarding.includes("Medicina")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        forwarding: [...formData.forwarding, "Medicina"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        forwarding: formData.forwarding.filter((item) => item !== "Medicina"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Medicina"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Medicina
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Odontologia"
                  checked={formData.forwarding.includes("Odontologia")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        forwarding: [...formData.forwarding, "Odontologia"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        forwarding: formData.forwarding.filter((item) => item !== "Odontologia"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Odontologia"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Odontologia
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="Fisioterapia"
                  checked={formData.forwarding.includes("Fisioterapia")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        forwarding: [...formData.forwarding, "Fisioterapia"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        forwarding: formData.forwarding.filter((item) => item !== "Fisioterapia"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Fisioterapia"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Fisioterapia
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Nutricao"
                  checked={formData.forwarding.includes("Nutricao")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        forwarding: [...formData.forwarding, "Nutricao"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        forwarding: formData.forwarding.filter((item) => item !== "Nutricao"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Nutricao"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Nutrição
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Enfermagem"
                  checked={formData.forwarding.includes("Enfermagem")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        forwarding: [...formData.forwarding, "Enfermagem"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        forwarding: formData.forwarding.filter((item) => item !== "Enfermagem"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Enfermagem"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Enfermagem
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Pscicologia"
                  checked={formData.forwarding.includes("Pscicologia")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        forwarding: [...formData.forwarding, "Pscicologia"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        forwarding: formData.forwarding.filter((item) => item !== "Pscicologia"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Pscicologia"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Pscicologia
                </label>
              </div>
            </div>
              
            <div className="flex flex-col gap-1">
              <Text>Reconhecimento de União estável:</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.other}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    other: e.target.value,
                  })
                }
              />
            </div> 

            <div className="flex flex-col gap-1">
              <Text>Reconhecimento de União estável:</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.other}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    other: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Outro:</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.other}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    other: e.target.value,
                  })
                }
              />
            </div> 
          </form>

          <Button
            type="submit"
            disabled={isLoadingCreateForm}
            onClick={() => handleSubmit()}
          >
            {isLoadingCreateForm ? (
              <CircularProgress size={24} color="secondary" />
            ) : (
              "Enviar"
            )}
          </Button>
        </div>
      </div>
    </RecordLayout>
  );
}

type ProfileUserProps = {
  user: { name: string; cpf: string };
};

function ProfileUser({ user, residents }: ProfileUserProps) {
  return (
    <div className="flex w-full flex-col gap-1 rounded-md border border-gray-300 bg-gray-100 px-4 py-2">
      <span className="text-sm">Nome: {user.name}</span>
      {user.socialName !== "" && (
        <span className="text-sm">Nome Social: {user.socialName}</span>
      )}

      <span className="text-sm">
        Data de Nascimento:{" "}
        {user.birthDate.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </span>
      <span className="text-sm">
        Idade: {new Date().getFullYear() - user.birthDate.getFullYear()}
      </span>
      {user.responsibleId && (
        <span className="text-sm">
          Responsável:{" "}
          {
            residents.find((resident) => resident.id === user.responsibleId)
              ?.name
          }
        </span>
      )}
    </div>
  );
}

import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import * as React from "react";

import { Text } from "@/components/elements/Text";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";

const frameworks = [
  {
    value: "ilhasLegais",
    label: "Ilhas Legais",
  },
  {
    value: "gaia",
    label: "Gaia 1",
  },
];

export function Combobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Selecione o tipo..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command>
          <CommandInput placeholder="Selecione o tipo..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
