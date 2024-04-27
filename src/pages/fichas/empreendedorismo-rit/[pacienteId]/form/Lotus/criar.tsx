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
    oportunidadeParaCriarUmNegocio: "",
    teveAlgumaExperienciaParaIniciarUmNegocio: "",
    obsteveAlgumaExperienciaParaIniciarUmNegocio: "",
    investeEmAlgumProduto: "",
    obsInvesteEmAlgumProduto: "",
    participariaDeUmaCapacitacao: "",
    obsParticipariaDeUmaCapacitacao: "",
    jaLidouComFinancas: "",
    obsJaLidouComFinancas: "",
    possuiInterneteDispositivosEletronicos: "",
    obsPossuiInterneteDispositivosEletronicos: "",
    familiaridadeComTecnologia: "",
    obsFamiliaridadeComTecnologia: "",
    comoSeAtualizaSobreTendenciasDeNegocio: "",
    experienciaEmLidarComClientes: "",
    obsExperienciaEmLidarComClientes: "",
    participouDeProgramasDeCapacitacao: "",
    obsParticipouDeProgramasDeCapacitacao: "",
    interesseEmParticipar: "",
    obsInteresseEmParticipar: "",
    facilidadeEmSeAdaptarEmNovosAmbientes: "",
    obsFacilidadeEmSeAdaptarEmNovosAmbientes: "",

    renda: "",
    atividade_remunerada: "",
    qual_atividade: "",
    tempo_empreend: "",
    oq_sabe_empreend: "",
    desejo_empreend: "",
    qual_negocio: "",

    caracteristicas_perfil: [""],
    outros_perfis: "",
    fonte_motivacao: "",
    expectativa_negocio: "",
    ajuda_empreendedorismo: "",
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
      await axios.post("/api/fichas/empreendedorismo-rit", {
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
        <h1 className="bold text-xl">Empreendedorismo (RIT)</h1>

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
                <label>Qual sua renda familiar?</label>
              </Text>

              <RadioGroup
                value={formData.renda}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    renda: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="UM_A_TRES"
                  control={<Radio />}
                  label="1 a 3 salários"
                />
                <FormControlLabel
                  value="TRES_A_CINCO"
                  control={<Radio />}
                  label="3 a 5 salários"
                />
                <FormControlLabel
                  value="MENOS_DE_UM"
                  control={<Radio />}
                  label="Menos de um salário mínimo"
                />
                <FormControlLabel
                  value="NAO_SABE"
                  control={<Radio />}
                  label="Não soube responder"
                />
              </RadioGroup>
            </div>


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Você possui alguma atividade remunerada?
                </label>
              </Text>

              <RadioGroup
                value={formData.atividade_remunerada}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    atividade_remunerada: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            {formData.atividade_remunerada === "Sim" && (
              <TextField
                label="Qual?"
                variant="filled"
                value={formData.qual_atividade}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    qual_atividade: event.target.value,
                  })
                }
              />
            )}


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Quanto tempo por semana você estima que estaria disposto a dedicar para desenvolver um
                  novo empreendimento ou atividade remunerada?</label>
              </Text>

              <RadioGroup
                value={formData.tempo_empreend}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    tempo_empreend: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="MENOS_DE_CINCO"
                  control={<Radio />}
                  label="Menos de 5 horas"
                />
                <FormControlLabel
                  value="CINCO_A_DEZ"
                  control={<Radio />}
                  label="5 a 10 horas"
                />
                <FormControlLabel
                  value="DEZ_A_VINTE"
                  control={<Radio />}
                  label="10 a 20 horas"
                />
                <FormControlLabel
                  value="MAIS_DE_VINTE"
                  control={<Radio />}
                  label="Mais de 20 horas"
                />
              </RadioGroup>
            </div>


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  O que você sabe sobre empreendedorismo?
                </label>
              </Text>
              <TextField
                label=""
                variant="filled"
                multiline
                rows={2}
                value={formData.oq_sabe_empreend}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    oq_sabe_empreend: event.target.value,
                  })
                }
              />
            </div>


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Você possui o desejo de empreender, ter seu próprio negócio/empresa?
                </label>
              </Text>

              <RadioGroup
                value={formData.desejo_empreend}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    desejo_empreend: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            {formData.desejo_empreend === "Sim" && (
              <TextField
                label="Qual?"
                variant="filled"
                value={formData.qual_negocio}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    qual_negocio: event.target.value,
                  })
                }
              />
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Quais são suas oportunidades para criar seu próprio negócio e desenvolver alguma atividade remunerada?</label>
              </Text>

              <RadioGroup
                value={formData.oportunidadeParaCriarUmNegocio}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    oportunidadeParaCriarUmNegocio: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="muitoBaixa" control={<Radio />} label="Muito baixa" />
                <FormControlLabel value="baixa" control={<Radio />} label="Baixa" />
                <FormControlLabel value="maisOuMenos" control={<Radio />} label="Mais ou Menos" />
                <FormControlLabel value="muitAlta" control={<Radio />} label="Muito alta" />
                <FormControlLabel value="alta" control={<Radio />} label="Alta" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Você já teve alguma experiência prévia em iniciar ou administrar um negócio próprio?</label>
              </Text>

              <RadioGroup
                value={formData.teveAlgumaExperienciaParaIniciarUmNegocio}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    teveAlgumaExperienciaParaIniciarUmNegocio: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="nao" control={<Radio />} label="Não" />
              </RadioGroup>

              <TextField
                label=""
                variant="filled"
                value={formData.obsteveAlgumaExperienciaParaIniciarUmNegocio}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    obsteveAlgumaExperienciaParaIniciarUmNegocio: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label> Você já investiu ou investe na venda/comercialização de algum produto? (roupas, sandálias, comida, ...)</label>
              </Text>

              <RadioGroup
                value={formData.investeEmAlgumProduto}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    investeEmAlgumProduto: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="nao" control={<Radio />} label="Não" />
              </RadioGroup>

              <TextField
                label=""
                variant="filled"
                value={formData.obsInvesteEmAlgumProduto}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    obsInvesteEmAlgumProduto: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label> Caso fizéssemos ações de capacitações, você teria interesse em participar? O que você gostaria de aprender?</label>
              </Text>

              <RadioGroup
                value={formData.participariaDeUmaCapacitacao}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    participariaDeUmaCapacitacao: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="nao" control={<Radio />} label="Não" />
              </RadioGroup>

              <TextField
                label=""
                variant="filled"
                value={formData.obsParticipariaDeUmaCapacitacao}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    obsParticipariaDeUmaCapacitacao: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Você já teve alguma experiência em lidar com finanças pessoais ou orçamento doméstico?</label>
              </Text>

              <RadioGroup
                value={formData.jaLidouComFinancas}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    jaLidouComFinancas: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="não" control={<Radio />} label="Não" />
              </RadioGroup>

              <TextField
                label=""
                variant="filled"
                value={formData.obsJaLidouComFinancas}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    obsJaLidouComFinancas: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Você possui acesso regular à internet e dispositivos como computador ou smartphone?</label>
              </Text>

              <RadioGroup
                value={formData.possuiInterneteDispositivosEletronicos}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    possuiInterneteDispositivosEletronicos: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="não" control={<Radio />} label="Não" />
              </RadioGroup>

              <TextField
                label=""
                variant="filled"
                value={formData.obsPossuiInterneteDispositivosEletronicos}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    obsPossuiInterneteDispositivosEletronicos: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Qual é o seu nível de familiaridade com tecnologias digitais, como redes sociais, aplicativos
                  de mensagens e plataformas online?</label>
              </Text>

              <RadioGroup
                value={formData.familiaridadeComTecnologia}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    familiaridadeComTecnologia: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="avancado" control={<Radio />} label="Avançado" />
                <FormControlLabel value="intermediario" control={<Radio />} label="Intermediário" />
                <FormControlLabel value="basico" control={<Radio />} label="Básico" />
                <FormControlLabel value="poucoFamiliar" control={<Radio />} label="Pouco Familiar" />
              </RadioGroup>

              <TextField
                label=""
                variant="filled"
                value={formData.obsFamiliaridadeComTecnologia}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    obsFamiliaridadeComTecnologia: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text> Como você costuma se manter atualizado(a) sobre tendências de mercado e oportunidades de negócio?</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.comoSeAtualizaSobreTendenciasDeNegocio}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    comoSeAtualizaSobreTendenciasDeNegocio: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label> Você já teve experiência em lidar com clientes ou público em geral?</label>
              </Text>

              <RadioGroup
                value={formData.experienciaEmLidarComClientes}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    experienciaEmLidarComClientes: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="não" control={<Radio />} label="Não" />
              </RadioGroup>

              <TextField
                label=""
                variant="filled"
                value={formData.obsExperienciaEmLidarComClientes}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    obsExperienciaEmLidarComClientes: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Você já participou de algum programa de capacitação ou treinamento em empreendedorismo ou habilidades relacionadas?</label>
              </Text>

              <RadioGroup
                value={formData.participouDeProgramasDeCapacitacao}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    participouDeProgramasDeCapacitacao: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="não" control={<Radio />} label="Não" />
              </RadioGroup>

              <TextField
                label=""
                variant="filled"
                value={formData.obsParticipouDeProgramasDeCapacitacao}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    obsParticipouDeProgramasDeCapacitacao: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label> Caso fizéssemos ações de capacitações, você teria interesse em participar? O que você
                  gostaria de aprender?</label>
              </Text>

              <RadioGroup
                value={formData.interesseEmParticipar}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    interesseEmParticipar: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="não" control={<Radio />} label="Não" />
              </RadioGroup>

              <TextField
                label=""
                variant="filled"
                value={formData.obsInteresseEmParticipar}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    obsInteresseEmParticipar: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label> Você tem facilidade em se adaptar a novas situações ou ambientes?</label>
              </Text>

              <RadioGroup
                value={formData.facilidadeEmSeAdaptarEmNovosAmbientes}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    facilidadeEmSeAdaptarEmNovosAmbientes: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="não" control={<Radio />} label="Não" />
                <FormControlLabel value="depende do contexto" control={<Radio />} label="Depende do contexto" />
              </RadioGroup>

              <TextField
                label=""
                variant="filled"
                value={formData.obsFacilidadeEmSeAdaptarEmNovosAmbientes}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    obsFacilidadeEmSeAdaptarEmNovosAmbientes: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Qual das características mais descrevem seu perfil?</label>
              </Text>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Otimista"
                  checked={formData.caracteristicas_perfil.includes("Otimista")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        caracteristicas_perfil: [...formData.caracteristicas_perfil, "Otimista"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        caracteristicas_perfil: formData.caracteristicas_perfil.filter((item) => item !== "Otimista"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Otimista"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Otimista
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Persistente"
                  checked={formData.caracteristicas_perfil.includes("Persistente")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        caracteristicas_perfil: [...formData.caracteristicas_perfil, "Persistente"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        caracteristicas_perfil: formData.caracteristicas_perfil.filter((item) => item !== "Persistente"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Persistente"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Persistente
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Confiante"
                  checked={formData.caracteristicas_perfil.includes("Confiante")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        caracteristicas_perfil: [...formData.caracteristicas_perfil, "Confiante"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        caracteristicas_perfil: formData.caracteristicas_perfil.filter((item) => item !== "Confiante"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Confiante"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Confiante
                </label>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Corajoso"
                  checked={formData.caracteristicas_perfil.includes("Corajoso")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        caracteristicas_perfil: [...formData.caracteristicas_perfil, "Corajoso"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        caracteristicas_perfil: formData.caracteristicas_perfil.filter((item) => item !== "Corajoso"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Corajoso"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Corajoso
                </label>
              </div>


              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="Negativo"
                  checked={formData.caracteristicas_perfil.includes("Negativo")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        caracteristicas_perfil: [...formData.caracteristicas_perfil, "Negativo"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        caracteristicas_perfil: formData.caracteristicas_perfil.filter((item) => item !== "Negativo"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Negativo"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Negativo
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="SemPaciencia"
                  checked={formData.caracteristicas_perfil.includes("SemPaciencia")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        caracteristicas_perfil: [...formData.caracteristicas_perfil, "SemPaciencia"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        caracteristicas_perfil: formData.caracteristicas_perfil.filter((item) => item !== "SemPaciencia"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="SemPaciencia"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Sem Paciência
                </label>
              </div>


              <div className="flex items-center space-x-2">
                <Checkbox id="Procrastinador"
                  checked={formData.caracteristicas_perfil.includes("Procrastinador")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        caracteristicas_perfil: [...formData.caracteristicas_perfil, "Procrastinador"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        caracteristicas_perfil: formData.caracteristicas_perfil.filter((item) => item !== "Procrastinador"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Procrastinador"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Procrastinador
                </label>
              </div>


              <div className="flex items-center space-x-2">
                <Checkbox id="Acomodado"
                  checked={formData.caracteristicas_perfil.includes("Acomodado")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        caracteristicas_perfil: [...formData.caracteristicas_perfil, "Acomodado"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        caracteristicas_perfil: formData.caracteristicas_perfil.filter((item) => item !== "Acomodado"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Acomodado"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Acomodado
                </label>
              </div>


              <div className="flex items-center space-x-2">
                <Checkbox id="Indisponível"
                  checked={formData.caracteristicas_perfil.includes("Indisponível")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormDate({
                        ...formData,
                        caracteristicas_perfil: [...formData.caracteristicas_perfil, "Indisponível"],
                      })
                    } else {
                      setFormDate({
                        ...formData,
                        caracteristicas_perfil: formData.caracteristicas_perfil.filter((item) => item !== "Indisponível"),
                      })
                    }
                  }}
                />
                <label
                  htmlFor="Indisponível"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Indisponível
                </label>
              </div>

              <div className="flex flex-col gap-1">
                <Text>Outros:</Text>
                <TextField
                  label=""
                  variant="filled"
                  value={formData.outros_perfis}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      outros_perfis: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            {/*caso esteja dando merda, ve se o problema nao é essa div aqui em cima desse comentario, caso
            nao seja ai eu nao sei oq é */}


            <div className="flex flex-col gap-1">
              <Text>Quais são suas principais fontes de motivação ou inspiração para buscar novas oportunidades?</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.fonte_motivacao}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    fonte_motivacao: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Quais são suas expectativas em relação a ter um negócio próprio?</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.expectativa_negocio}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    expectativa_negocio: e.target.value,
                  })
                }
              />
            </div>


            <div className="flex flex-col gap-1">
              <Text>No que podemos lhe ajudar, na vertente de empreendedorismo?</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.ajuda_empreendedorismo}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    ajuda_empreendedorismo: e.target.value,
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
