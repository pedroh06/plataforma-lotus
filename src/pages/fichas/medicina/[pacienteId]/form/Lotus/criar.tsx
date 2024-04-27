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
    main_complaint: "",
    sleep_pattern: "",
    delete_functions: "",
    birth_type: "",
    ig: "",
    had_complication_birth: "",
    vaccination_schedule: "",
    foot_test: "",
    any_changes: "",
    eye_test: "",
    heart_test: "",
    developmental_milestones: "",
    allergies: "",
    Personal_morbid_history: "",
    Family_background: "",
    medications_in_use: "",
    school_performance: "",
    socialization: "",
    education: "",
    ocupation: "",
    screenTime: "",
    alcoholism: "",
    smoking: "",
    use_of_drugs: "",
    physical_activity: "",
    menarche: "",
    dum: "",
    sexarch: "",
    cicle: "",
    use_of_contraceptive_method: "",
    examiners_perception: "",
    ac: "",
    ap: "",
    pulse: "",
    breathing: "",
    pa: "",
    temp: "",
    request_for_specific_demand_approach: "",
    observation: "",
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
      await axios.post("/api/fichas/medicina", {
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
        <h1 className="bold text-xl">Medicina</h1>

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
              <Text>Queixa principal:</Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.main_complaint}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    main_complaint: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Padrão de repouso e sono:</Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.sleep_pattern}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    sleep_pattern: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Funções de eliminação:</Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.delete_functions
                }
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    delete_functions: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Tipo de parto:</Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.birth_type
                }
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    birth_type: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>IG:</Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.ig}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    ig: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Teve complicação no parto/pré natal:</Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.had_complication_birth}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    had_complication_birth: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Calendário vacinal:</Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.vaccination_schedule
                }
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    vaccination_schedule: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Teste do pezinho:</label>
              </Text>

              <RadioGroup
                value={formData.foot_test
                }
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    foot_test: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="Nao" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text>Alguma alteração:</Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.any_changes}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    any_changes: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Teste do olhinho:</label>
              </Text>

              <RadioGroup
                value={formData.eye_test}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    eye_test: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="Nao" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Teste do coraçãozinho:</label>
              </Text>

              <RadioGroup
                value={formData.heart_test}
                onChange={(event) =>
                  setFormDate({
                    ...formData,
                    heart_test: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="Nao" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text>Marcos de desenvolvimento: </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.developmental_milestones}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    developmental_milestones: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Alergias : </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.allergies}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    allergies: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Antecedentes mórbidos pessoais: </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.Personal_morbid_history}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    Personal_morbid_history: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Antecedentes familiares:  </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.Family_background}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    Family_background: e.target.value,
                  })
                }
              />
            </div>


            <div className="flex flex-col gap-1">
              <Text>Medicações em uso:</Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.medications_in_use}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    medications_in_use: e.target.value,
                  })
                }
              />
            </div>



            <div className="flex flex-col gap-1">
              <Text>Desempenho escolar:</Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.school_performance}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    school_performance: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Socialização: </Text>
              <TextField
                label=""
                multiline
                rows={1}
                variant="filled"
                value={formData.socialization}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    socialization: e.target.value,
                  })
                }
              />
            </div>




            <div className="flex flex-col gap-1">
              <Text>Escolaridade</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.education}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    education: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text>Ocupação:</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.ocupation}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    ocupation: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Hábitos de vida:</label>
              </Text>

              <div className="flex flex-col gap-1">
                <Text>Tempo de tela:</Text>
                <TextField
                  label=""
                  variant="filled"
                  value={formData.screenTime}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      screenTime: e.target.value,
                    })
                  }
                />
              </div>


              <div className="flex flex-col gap-1">
                <Text>Etilismo:</Text>
                <TextField
                  label=""
                  variant="filled"
                  value={formData.alcoholism}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      alcoholism: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <Text>Tabagismo:</Text>
                <TextField
                  label=""
                  variant="filled"
                  value={formData.smoking}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      smoking: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <Text>Uso de drogas:</Text>
                <TextField
                  label=""
                  variant="filled"
                  value={formData.use_of_drugs}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      use_of_drugs: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <Text>Atividade física:</Text>
                <TextField
                  label=""
                  variant="filled"
                  value={formData.physical_activity
                  }
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      physical_activity: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <Text>Menarca:</Text>
                <TextField
                  label=""
                  variant="filled"
                  value={formData.menarche}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      menarche: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <Text>DUM (_/_/_):</Text>
                <TextField
                  label=""
                  variant="filled"
                  value={formData.dum}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      dum: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <Text>Sexarca:</Text>
                <TextField
                  label=""
                  variant="filled"
                  value={formData.sexarch}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      sexarch: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <Text>Ciclo:</Text>
                <TextField
                  label=""
                  variant="filled"
                  value={formData.cicle}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      cicle: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <Text>Uso de método contraceptivo:</Text>
                <TextField
                  label=""
                  variant="filled"
                  value={formData.use_of_contraceptive_method
                  }
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      use_of_contraceptive_method: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <Text>Percepção do examinador</Text>
                <TextField
                  label=""
                  variant="filled"
                  value={formData.examiners_perception
                  }
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      examiners_perception: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <Text size="lg" asChild>
                  <label>Exame físico:</label>
                </Text>


                <div className="flex flex-col gap-1">
                  <Text>AC:</Text>
                  <TextField
                    label=""
                    variant="filled"
                    value={formData.ac}
                    onChange={(e) =>
                      setFormDate({
                        ...formData,
                        ac: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <Text>AP:</Text>
                <TextField
                  label=""
                  variant="filled"
                  value={formData.ap}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      ap: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <Text size="lg" asChild>
                  <label>SSVV (sinaid vitais):</label>
                </Text>


                <div className="flex flex-col gap-1">
                  <Text>Pulso:</Text>
                  <TextField
                    label=""
                    variant="filled"
                    value={formData.pulse}
                    onChange={(e) =>
                      setFormDate({
                        ...formData,
                        pulse: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <Text>Respiração: </Text>
                <TextField
                  label=""
                  variant="filled"
                  value={formData.breathing}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      breathing: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <Text>PA: </Text>
                <TextField
                  label=""
                  variant="filled"
                  value={formData.pa}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      pa: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <Text>Temp: </Text>
                <TextField
                  label=""
                  variant="filled"
                  value={formData.temp}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      temp: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <Text>Solicitação de abordagem de demanda específica: </Text>
                <TextField
                  label=""
                  variant="filled"
                  value={formData.request_for_specific_demand_approach
                  }
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      request_for_specific_demand_approach: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <Text>Observaçõe:</Text>
                <TextField
                  label=""
                  variant="filled"
                  value={formData.observation}
                  onChange={(e) =>
                    setFormDate({
                      ...formData,
                      observation: e.target.value,
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
