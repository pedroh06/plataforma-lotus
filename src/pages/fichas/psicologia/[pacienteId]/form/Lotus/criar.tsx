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

    renda: "",
    procura_motivo: "",
    sentindo_hoje: "",
    acompanhamento: "",
    atendimento: "",
    medicacao: "",
    ja_usou_med: "",
    outros_tratamentos: "",



    renda_fixa: "",
    fonte_renda: "",
    atividadesdiaadia: "",
    momentos_de_lazer: "",
    autocuidado: "",
    estresse: "",
    lida_estresse: "",
    sono: "",
    alimentacao: "",


    pessoas_em_casa: "",
    rede_de_apoio: "",
    qual_rede: "",
    dependentes: "",
    emprego_renda_familia: "",
    desafios_moradia: "",
    necessidade_alimentacao: "",
    acesso_a_tecnologia: "",
    acesso_a_assistencia: "",
    ciente_de_recursos: "",
    outra_informacao: "",



    filhos: "",
    nome_filho: "",
    idade_filho: "",
    filhos_matriculados: "",
    filhos_necessidades: "",
    comportamento_filhos: "",
    comportam_escola: "",
    comportam_em_casa: "",


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
      await axios.post("/api/fichas/psicologia", {
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
        <h1 className="bold text-xl">Psicologia</h1>

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
                <label>Qual sua renda em salários mínimos?</label>
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
                  value="SEIS_A_OITO"
                  control={<Radio />}
                  label="6 a 8 salários"
                />
                <FormControlLabel
                  value="NOVE_MAIS"
                  control={<Radio />}
                  label="9 salários ou superior"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text>Motivo da procura:</Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.procura_motivo}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    procura_motivo: e.target.value,
                  })
                }
              />
            </div>


            {/*Tratamentos
              1) Comovocê está se sentindo hoje?
              2) Você já teve acompanhamento psiquiátrico?
              3) Você já teve atendimento psicológico?
              4) Atualmente, você faz uso de alguma medicação?
              5) Você já realizou uso de medicamentos?
              6) Quais outros tratamentos você já fez? */}

            <div className="flex flex-col gap-1">
              <Text>TRATAMENTOS:</Text>
            </div>

            <div className="flex flex-col gap-1">
              <Text>Como você está se sentindo hoje?</Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.sentindo_hoje}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    sentindo_hoje: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Você já teve acompanhamento psiquiátrico?</Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.acompanhamento}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    acompanhamento: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Você já teve atendimento psicológico? </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.atendimento}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    atendimento: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Atualmente, você faz uso de alguma medicação? </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.medicacao}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    medicacao: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Você já realizou uso de medicamentos? </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.ja_usou_med}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    ja_usou_med: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Quais outros tratamentos você fez? </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.outros_tratamentos}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    outros_tratamentos: e.target.value,
                  })
                }
              />
            </div>


            <div className="flex flex-col gap-1">
              <Text>PERGUNTAS PARA OS PAIS E/OU RESPONSÁVEIS</Text>
            </div>

            <div className="flex flex-col gap-1">
              <Text>Você possui renda fixa? </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.renda_fixa}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    renda_fixa: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Qual(is) sua fonte(s) de renda? </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.fonte_renda}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    fonte_renda: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Quais suas atividades do dia a dia? </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.atividadesdiaadia}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    atividadesdiaadia: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>O que você gosta de fazer em momentos de lazer?  </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.momentos_de_lazer}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    momentos_de_lazer: e.target.value,
                  })
                }
              />
            </div>


            <div className="flex flex-col gap-1">
              <Text>Como você avalia seu autocuidado?</Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.autocuidado}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    autocuidado: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Como você avalia seu estresse, de 0 a 10?</label>
              </Text>

              <RadioGroup
                value={formData.estresse}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    estresse: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="0" control={<Radio />} label="0" />
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="4" control={<Radio />} label="4" />
                <FormControlLabel value="5" control={<Radio />} label="5" />
                <FormControlLabel value="6" control={<Radio />} label="6" />
                <FormControlLabel value="7" control={<Radio />} label="7" />
                <FormControlLabel value="8" control={<Radio />} label="8" />
                <FormControlLabel value="9" control={<Radio />} label="9" />
                <FormControlLabel value="10" control={<Radio />} label="10" />
              </RadioGroup>
            </div>


            <div className="flex flex-col gap-1">
              <Text>Como você lida com esse estresse?</Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.lida_estresse}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    lida_estresse: e.target.value,
                  })
                }
              />
            </div>


            <div className="flex flex-col gap-1">
              <Text>Como você avalia seu sono?</Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.sono}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    sono: e.target.value,
                  })
                }
              />
            </div>


            <div className="flex flex-col gap-1">
              <Text>Como você avalia a sua alimentação?</Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.alimentacao}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    alimentacao: e.target.value,
                  })
                }
              />
            </div>


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>DINÂMICA FAMILIAR:</label>
              </Text>

              <div className="flex flex-col gap-1">
                <Text>Quantas pessoas moram na sua casa?</Text>
                <TextField
                  label=""
                  multiline
                  rows={1}
                  variant="filled"
                  value={formData.pessoas_em_casa}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      pessoas_em_casa: e.target.value,
                    })
                  }
                />
              </div>


              <div className="flex flex-col gap-1">
                <Text size="lg" asChild>
                  <label>Você possui rede de apoio?</label>
                </Text>

                <RadioGroup
                  value={formData.rede_de_apoio}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      rede_de_apoio: e.target.value,
                    })
                  }
                  row
                >
                  <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                  <FormControlLabel value="NAO" control={<Radio />} label="Não" />

                </RadioGroup>
              </div>

              {formData.rede_de_apoio === "SIM" && (
                <TextField
                  label="Quem são?"
                  variant="filled"
                  value={formData.qual_rede}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      qual_rede: e.target.value,
                    })
                  }
                />
              )}



              <div className="flex flex-col gap-1">
                <Text>Você possui quantos dependentes?</Text>
                <TextField
                  label=""
                  multiline
                  rows={1}
                  variant="filled"
                  value={formData.dependentes}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      dependentes: e.target.value,
                    })
                  }
                />
              </div>


              <div className="flex flex-col gap-1">
                <Text>Como está a situação de emprego ou fonte de renda na sua família?</Text>
                <TextField
                  label=""
                  multiline
                  rows={1}
                  variant="filled"
                  value={formData.emprego_renda_familia}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      emprego_renda_familia: e.target.value,
                    })
                  }
                />
              </div>



              <div className="flex flex-col gap-1">
                <Text>A sua família enfrenta desafios relacionados à moradia ou condições de habitação?</Text>
                <TextField
                  label=""
                  multiline
                  rows={1}
                  variant="filled"
                  value={formData.desafios_moradia}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      desafios_moradia: e.target.value,
                    })
                  }
                />
              </div>


              <div className="flex flex-col gap-1">
                <Text>Existe alguma necessidade específica relacionada à alimentação?</Text>
                <TextField
                  label=""
                  multiline
                  rows={1}
                  variant="filled"
                  value={formData.necessidade_alimentacao}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      necessidade_alimentacao: e.target.value,
                    })
                  }
                />
              </div>


              <div className="flex flex-col gap-1">
                <Text>Como é o acesso à tecnologia e à internet na sua casa? Isso afeta a educação das crianças?</Text>
                <TextField
                  label=""
                  multiline
                  rows={1}
                  variant="filled"
                  value={formData.acesso_a_tecnologia}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      acesso_a_tecnologia: e.target.value,
                    })
                  }
                />
              </div>


              <div className="flex flex-col gap-1">
                <Text>Sua família tem acesso a programas de assistência social ou benefícios governamentais?</Text>
                <TextField
                  label=""
                  multiline
                  rows={1}
                  variant="filled"
                  value={formData.acesso_a_assistencia}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      acesso_a_assistencia: e.target.value,
                    })
                  }
                />
              </div>


              <div className="flex flex-col gap-1">
                <Text>Sua família está ciente de recursos e serviços disponíveis na comunidade?</Text>
                <TextField
                  label=""
                  multiline
                  rows={1}
                  variant="filled"
                  value={formData.ciente_de_recursos}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      ciente_de_recursos: e.target.value,
                    })
                  }
                />
              </div>


              <div className="flex flex-col gap-1">
                <Text>Existe alguma outra informação que você gostaria de compartilhar sobre as necessidades da família?</Text>
                <TextField
                  label=""
                  multiline
                  rows={1}
                  variant="filled"
                  value={formData.outra_informacao}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      outra_informacao: e.target.value,
                    })
                  }
                />
              </div>
            </div>


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>RELACIONADO A CRIANÇAS:</label>
              </Text>


              <div className="flex flex-col gap-1">
                <Text size="lg" asChild>
                  <label>Você tem filhos?</label>
                </Text>

                <RadioGroup
                  value={formData.filhos}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      filhos: e.target.value,
                    })
                  }
                  row
                >
                  <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                  <FormControlLabel value="NAO" control={<Radio />} label="Não" />

                </RadioGroup>
              </div>

              {formData.filhos === "SIM" && (
                <TextField
                  label="Quais seus nomes?"
                  variant="filled"
                  value={formData.nome_filho}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      nome_filho: e.target.value,
                    })
                  }
                />
              )}


              {formData.filhos === "SIM" && (
                <TextField
                  label="Quais suas idades?"
                  variant="filled"
                  value={formData.idade_filho}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      idade_filho: e.target.value,
                    })
                  }
                />
              )}


              <div className="flex flex-col gap-1">
                <Text>Os seus filhos estão matrículados na escola?</Text>
                <TextField
                  label=""
                  multiline
                  rows={1}
                  variant="filled"
                  value={formData.filhos_matriculados}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      filhos_matriculados: e.target.value,
                    })
                  }
                />
              </div>


              <div className="flex flex-col gap-1">
                <Text>Quais as necessidades educacionais dos seus filhos?</Text>
                <TextField
                  label=""
                  multiline
                  rows={1}
                  variant="filled"
                  value={formData.filhos_necessidades}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      filhos_necessidades: e.target.value,
                    })
                  }
                />
              </div>



              <div className="flex flex-col gap-1">
                <Text>Como você descreveria o comportamento dos filhos? (EX: calmo, comunicativo, desatentos, tímidos, etc.)</Text>
                <TextField
                  label=""
                  multiline
                  rows={1}
                  variant="filled"
                  value={formData.comportamento_filhos}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      comportamento_filhos: e.target.value,
                    })
                  }
                />
              </div>


              <div className="flex flex-col gap-1">
                <Text>Como eles se comportam na escola?</Text>
                <TextField
                  label=""
                  multiline
                  rows={1}
                  variant="filled"
                  value={formData.comportam_escola}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      comportam_escola: e.target.value,
                    })
                  }
                />
              </div>


              <div className="flex flex-col gap-1">
                <Text>Como o seu filho se comporta em casa?</Text>
                <TextField
                  label=""
                  multiline
                  rows={1}
                  variant="filled"
                  value={formData.comportam_em_casa}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      comportam_em_casa: e.target.value,
                    })
                  }
                />
              </div>

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
