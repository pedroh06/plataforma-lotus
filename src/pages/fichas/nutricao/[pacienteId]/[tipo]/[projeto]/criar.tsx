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
    cirurgia: "",
    qual_cirurgia: "",
    health_problem: "",
    tabagismo: "",
    alcoolismo: "",
    obesidade: "",
    obesos_familia: "",
    obeso_qual: "",
    diabete: "",
    diabetico_familia: "",
    diabeticos_qual: "",
    insulina: "",
    patologia: [""],
    outra_patologia: "",
    condicao_saude: "",
    qual_condicao: "",

    restric_alimentar: "",
    restric_alimentar_qual: "",

    peso: "",
    altura: "",
    refeic_pordia: "",
    agua_pordia: "",
    fruta_vegetal: "",
    frutaveg_frequencia: "",
    alimento_processado: "",
    alimento_processado_frequencia: "",
    apetite: "",
    suplemento: "",
    suplemento_qual: "",



    atividade_fisica: "",
    atividade_fisica_frequencia: "",


    hora_acorda: "",
    hora_dormir: "",
    dorme_noite_toda: "",
    medicacao_sono: "",
    qual_medicacao: "",



    

    

    
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
    e.preventDefault();

    try {
      setIsLoadingCreateForm(true);
      await axios.post("/api/fichas/nutricao", {
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
        <h1 className="bold text-xl">Nutrição</h1>

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
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Já fez alguma cirurgia?
                </label>
              </Text>

              <RadioGroup
                value={formData.cirurgia}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    cirurgia: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            {formData.cirurgia === "Sim" && (
              <TextField
                label="Informe qual"
                variant="filled"
                value={formData.qual_cirurgia}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    qual_cirurgia: event.target.value,
                  })
                }
              />
            )}


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Tabagismo?
                </label>
              </Text>

              <RadioGroup
                value={formData.tabagismo}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    tabagismo: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>



            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Alcoolismo?
                </label>
              </Text>

              <RadioGroup
                value={formData.alcoolismo}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    alcoolismo: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Obesidade?
                </label>
              </Text>

              <RadioGroup
                value={formData.obesidade}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    obesidade: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Há obesos na família?
                </label>
              </Text>

              <RadioGroup
                value={formData.obesos_familia}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    obesos_familia: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>


            {formData.obesos_familia === "Sim" && (
              <TextField
                label="Quem?"
                variant="filled"
                value={formData.obeso_qual}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    obeso_qual: event.target.value,
                  })
                }
              />
            )}


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Há diabeticos na família?
                </label>
              </Text>

              <RadioGroup
                value={formData.diabetico_familia}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    diabetico_familia: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            {formData.diabetico_familia === "Sim" && (
              <TextField
                label="Quem?"
                variant="filled"
                value={formData.diabeticos_qual}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    diabeticos_qual: event.target.value,
                  })
                }
              />
            )}


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Você é diabético(a)?
                </label>
              </Text>

              <RadioGroup
                value={formData.diabete}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    diabete: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Faz uso de insulina?
                </label>
              </Text>

              <RadioGroup
                value={formData.insulina}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    insulina: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>



            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Patologia:</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Colesterol"
                  checked={formData.patologia.includes("Colesterol")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        patologia: [...formData.patologia, "Colesterol"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        patologia: formData.patologia.filter((item) => item !== "Colesterol"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Colesterol"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Colesterol
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Triglicéridesalterado"
                  checked={formData.patologia.includes("Triglicéridesalterado")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        patologia: [...formData.patologia, "Triglicéridesalterado"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        patologia: formData.patologia.filter((item) => item !== "Triglicéridesalterado"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Triglicéridesalterado"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Triglicérides alterado
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Convulsões"
                  checked={formData.patologia.includes("Convulsões")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        patologia: [...formData.patologia, "Convulsões"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        patologia: formData.patologia.filter((item) => item !== "Convulsões"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Convulsões"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Convulsões
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="problemas_gastricos"
                  checked={formData.patologia.includes("problemas_gastricos")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        patologia: [...formData.patologia, "problemas_gastricos"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        patologia: formData.patologia.filter((item) => item !== "problemas_gastricos"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="problemas_gastricos"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Problemas gástricos
                </label>
              </div>


              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Ansiedade"
                  checked={formData.patologia.includes("Ansiedade")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        patologia: [...formData.patologia, "Ansiedade"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        patologia: formData.patologia.filter((item) => item !== "Ansiedade"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Ansiedade"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Ansiedade
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="Problemas_cardiacos"
                  checked={formData.patologia.includes("Problemas_cardiacos")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        patologia: [...formData.patologia, "Problemas_cardiacos"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        patologia: formData.patologia.filter((item) => item !== "Problemas_cardiacos"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Problemas_cardiacos"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Problemas cardíacos
                </label>
              </div>

              <div className="flex flex-col gap-1">
                <Text>Outro:</Text>
                <TextField
                  label=""
                  variant="filled"
                  value={formData.outra_patologia}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      outra_patologia: e.target.value,
                    })
                  }
                />
              </div>
            </div>




            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>HISTÓRICO ALIMENTAR NUTRICIONAL: </label>
              </Text>

              <div className="flex flex-col gap-1">
                <Text size="lg" asChild>
                  <label className="max-w-[80%]">
                    Você possui alguma condição de saúde que possa afetar sua alimentação?
                  </label>
                </Text>

                <RadioGroup
                  value={formData.condicao_saude}
                  onChange={(event) =>
                    setFormDate({
                      ...formData,
                      condicao_saude: event.target.value,
                    })
                  }
                  row
                >
                  <FormControlLabel value="Não" control={<Radio />} label="Não" />
                  <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                </RadioGroup>
              </div>

              {formData.condicao_saude === "Sim" && (
                <TextField
                  label="Qual?"
                  variant="filled"
                  value={formData.qual_condicao}
                  onChange={(event) =>
                    setFormDate({
                      ...formData,
                      qual_condicao: event.target.value,
                    })
                  }
                />
              )}






              <div className="flex flex-col gap-1">
                <Text size="lg" asChild>
                  <label className="max-w-[80%]">
                    Você possui alguma restrição alimentar ou alergia?
                  </label>
                </Text>

                <RadioGroup
                  value={formData.restric_alimentar}
                  onChange={(event) =>
                    setFormDate({
                      ...formData,
                      restric_alimentar: event.target.value,
                    })
                  }
                  row
                >
                  <FormControlLabel value="Não" control={<Radio />} label="Não" />
                  <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                </RadioGroup>
              </div>

              {formData.restric_alimentar === "Sim" && (
                <TextField
                  label="Qual?"
                  variant="filled"
                  value={formData.restric_alimentar_qual}
                  onChange={(event) =>
                    setFormDate({
                      ...formData,
                      restric_alimentar_qual: event.target.value,
                    })
                  }
                />
              )}
            </div>



            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Peso atual em kg:
                </label>
              </Text>
              <TextField
                label=""
                variant="filled"
                multiline
                rows={2}
                value={formData.peso}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    peso: event.target.value,
                  })
                }
              />
            </div>


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Altura:
                </label>
              </Text>
              <TextField
                label=""
                variant="filled"
                multiline
                rows={2}
                value={formData.altura}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    altura: event.target.value,
                  })
                }
              />
            </div>


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Quantas refeições por dia?
                </label>
              </Text>
              <TextField
                label=""
                variant="filled"
                multiline
                rows={2}
                value={formData.refeic_pordia}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    refeic_pordia: event.target.value,
                  })
                }
              />
            </div>


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Ingestão de água por dia?
                </label>
              </Text>
              <TextField
                label=""
                variant="filled"
                multiline
                rows={2}
                value={formData.agua_pordia}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    agua_pordia: event.target.value,
                  })
                }
              />
            </div>


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Você consome frutas e vegetais?
                </label>
              </Text>

              <RadioGroup
                value={formData.fruta_vegetal}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    fruta_vegetal: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            {formData.fruta_vegetal === "Sim" && (
              <TextField
                label="Com qual frequência?"
                variant="filled"
                value={formData.frutaveg_frequencia}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    frutaveg_frequencia: event.target.value,
                  })
                }
              />
            )}



            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Você costuma ingerir alimentos ultraprocessados?
                </label>
              </Text>

              <RadioGroup
                value={formData.alimento_processado}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    alimento_processado: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            {formData.alimento_processado === "Sim" && (
              <TextField
                label="Com qual frequência?"
                variant="filled"
                value={formData.alimento_processado_frequencia}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    alimento_processado_frequencia: event.target.value,
                  })
                }
              />
            )}


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Como é seu apetite em geral?
                </label>
              </Text>
              <TextField
                label=""
                variant="filled"
                multiline
                rows={2}
                value={formData.apetite}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    apetite: event.target.value,
                  })
                }
              />
            </div>



            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Você toma algum suplemento vitamínico ou mineral?
                </label>
              </Text>

              <RadioGroup
                value={formData.suplemento}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    suplemento: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            {formData.suplemento === "Sim" && (
              <TextField
                label="Qual?"
                variant="filled"
                value={formData.suplemento_qual}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    suplemento_qual: event.target.value,
                  })
                }
              />
            )}


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>ATIVIDADE FÍSICA: </label>
              </Text>


              <div className="flex flex-col gap-1">
                <Text size="lg" asChild>
                  <label className="max-w-[80%]">
                    Faz a prática de atividades?
                  </label>
                </Text>

                <RadioGroup
                  value={formData.atividade_fisica}
                  onChange={(event) =>
                    setFormDate({
                      ...formData,
                      atividade_fisica: event.target.value,
                    })
                  }
                  row
                >
                  <FormControlLabel value="Não" control={<Radio />} label="Não" />
                  <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                </RadioGroup>
              </div>

              {formData.atividade_fisica === "Sim" && (
                <TextField
                  label="Em qual frequência?"
                  variant="filled"
                  value={formData.atividade_fisica_frequencia}
                  onChange={(event) =>
                    setFormDate({
                      ...formData,
                      atividade_fisica_frequencia: event.target.value,
                    })
                  }
                />
              )}
              </div>  


              <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>QUALIDADE DO SONO: </label>
              </Text>

              <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Que horas costuma acordar:
                </label>
              </Text>
              <TextField
                label=""
                variant="filled"
                multiline
                rows={2}
                value={formData.hora_acorda}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    hora_acorda: event.target.value,
                  })
                }
              />
              </div>


              <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Ques horas costuma dormir:
                </label>
              </Text>
              <TextField
                label=""
                variant="filled"
                multiline
                rows={2}
                value={formData.hora_dormir}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    hora_dormir: event.target.value,
                  })
                }
              />
            </div>


            <div className="flex flex-col gap-1">
                <Text size="lg" asChild>
                  <label className="max-w-[80%]">
                    Dorme a noite toda?
                  </label>
                </Text>

                <RadioGroup
                  value={formData.dorme_noite_toda}
                  onChange={(event) =>
                    setFormDate({
                      ...formData,
                      dorme_noite_toda: event.target.value,
                    })
                  }
                  row
                >
                  <FormControlLabel value="Não" control={<Radio />} label="Não" />
                  <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                </RadioGroup>
              </div>


              <div className="flex flex-col gap-1">
                <Text size="lg" asChild>
                  <label className="max-w-[80%]">
                    Toma alguma medicação que interfira no sono?
                  </label>
                </Text>

                <RadioGroup
                  value={formData.medicacao_sono}
                  onChange={(event) =>
                    setFormDate({
                      ...formData,
                      medicacao_sono: event.target.value,
                    })
                  }
                  row
                >
                  <FormControlLabel value="Não" control={<Radio />} label="Não" />
                  <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                </RadioGroup>
              </div>

              {formData.medicacao_sono === "Sim" && (
                <TextField
                  label="Qual?"
                  variant="filled"
                  value={formData.qual_medicacao}
                  onChange={(event) =>
                    setFormDate({
                      ...formData,
                      qual_medicacao: event.target.value,
                    })
                  }
                />
              )}

            </div>


              <Button type="submit" disabled={isLoadingCreateForm}>
                {isLoadingCreateForm ? (
                  <CircularProgress size={24} color="secondary" />
                ) : (
                  "Enviar"
                )}
              </Button>
          </form>
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
      <span className="text-sm">CPF: {user.cpf}</span>
      <span className="text-sm">RG: TODO:</span>
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
