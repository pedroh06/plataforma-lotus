/* eslint-disable @typescript-eslint/no-explicit-any */
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

  const [data, setData] = useState([]);

  const [formData, setFormDate] = useState({

    instrucao: "",
    gosta_doces: "",
    gosta_cafe: "",
    alcool: "",
    fumante: "",
    cirurgia: "",
    qual_cirurgia: "",
    complicacao: "",
    odontalgia: "",
    odontalgia_descricao: "",
    fistula: "",
    abscesso_periodontal: "",
    apinhamento_dentario: "",
    raizes_residuais: "",
    raizes_quais: "",
    edema: "",
    bruxismo: "",
    atricao_erosao_abrasao: "",
    apertamento: "",
    unhas: "",
    morde_objetos: "",
    objetos_quais: "",

    tenso: "",
    ausencia_dentes: "",
    protese: "",
    qual_protese: "",

    complaint: "",
    isToothache: "",
    isGumPain: "",
    isGumsBleedWhenBrushing: "",
    isUseToothpaste: "",
    isUseDentalFloss: "",
    brushingFrequency: "",
    brushType: "",
    brushChange: "",
    isUsePacifier: "",
    eatingHabits: "",
    isAllergic: "",
    allergy: "",
    dentalTreatmentStatus: "",
    dentalTreatment: "",

    gum: "",
    gumObs: "",
    jugalMucosa: "",
    jugalObs: "",
    palate: "",
    palateObs: "",
    floor: "",
    floorObs: "",
    tongue: "",
    tongueObs: "",
    fluorosis: "",
    fluorosisObs: "",
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
    
    try {
      setIsLoadingCreateForm(true);
      await axios.post("/api/fichas/odontologia", {
        userId: pacienteId,
        ...formData,
        teeth: data,
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
        <h1 className="bold text-xl">Odontologia</h1>

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
                <label>Já teve instrução de higiene oral?</label>
              </Text>

              <RadioGroup
                value={formData.instrucao}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    instrucao: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Escovação quantas vezes ao dia?</label>
              </Text>

              <RadioGroup
                value={formData.brushingFrequency}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    brushingFrequency: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="UMA_VEZ"
                  control={<Radio />}
                  label="1 vezes"
                />
                <FormControlLabel
                  value="DUAS_VEZES"
                  control={<Radio />}
                  label="2 vezes"
                />
                <FormControlLabel
                  value="TRES_VEZES_OU_MAIS_VEZES"
                  control={<Radio />}
                  label="3 vezes +"
                />
                <FormControlLabel
                  value="NENHUMA"
                  control={<Radio />}
                  label="nenhuma"
                />
              </RadioGroup>
            </div>


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Usa fio dental?</label>
              </Text>

              <RadioGroup
                value={formData.isUseToothpaste}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    isUseToothpaste: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>



            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Tipo de escova</label>
              </Text>

              <RadioGroup
                value={formData.brushType}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    brushType: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="INDIVIDUAL"
                  control={<Radio />}
                  label="Individual"
                />
                <FormControlLabel
                  value="COLETIVA"
                  control={<Radio />}
                  label="Coletiva"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>HÁBITOS ALIMENTARES: Gosta de doces?</label>
              </Text>

              <RadioGroup
                value={formData.gosta_doces}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    gosta_doces: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>HÁBITOS ALIMENTARES: Gosta de café?</label>
              </Text>

              <RadioGroup
                value={formData.gosta_cafe}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    gosta_cafe: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Faz uso de álcool?</label>
              </Text>

              <RadioGroup
                value={formData.alcool}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    alcool: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />

              </RadioGroup>
            </div>


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Fumante?</label>
              </Text>

              <RadioGroup
                value={formData.fumante}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    fumante: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />

              </RadioGroup>
            </div>



            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Já realizou cirurgia odontológica?</label>
              </Text>

              <RadioGroup
                value={formData.cirurgia}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    cirurgia: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />

              </RadioGroup>
            </div>


            {formData.cirurgia === "SIM" && (
              <TextField
                label="Qual?"
                variant="filled"
                value={formData.qual_cirurgia}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    qual_cirurgia: e.target.value,
                  })
                }
              />
            )}

            {formData.cirurgia === "SIM" && (
              <TextField
                label="Teve alguma complicação?"
                variant="filled"
                value={formData.complicacao}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    complicacao: e.target.value,
                  })
                }
              />
            )}


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Odontalgia?</label>
              </Text>

              <RadioGroup
                value={formData.odontalgia}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    odontalgia: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />

              </RadioGroup>
            </div>


            {formData.odontalgia === "SIM" && (
              <TextField
                label="Estim. Espont."
                variant="filled"
                value={formData.odontalgia_descricao}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    odontalgia_descricao: e.target.value,
                  })
                }
              />
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Fístula no dente/região?</label>
              </Text>

              <RadioGroup
                value={formData.fistula}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    fistula: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />

              </RadioGroup>
            </div>



            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Abscesso periodontal no dente?</label>
              </Text>

              <RadioGroup
                value={formData.abscesso_periodontal}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    abscesso_periodontal: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />

              </RadioGroup>
            </div>



            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Apinhamento dentário:</label>
              </Text>

              <RadioGroup
                value={formData.apinhamento_dentario}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    apinhamento_dentario: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />

              </RadioGroup>
            </div>


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Raízes residuais:</label>
              </Text>

              <RadioGroup
                value={formData.raizes_residuais}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    raizes_residuais: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />

              </RadioGroup>
            </div>

            {formData.raizes_residuais === "SIM" && (
              <TextField
                label=""
                variant="filled"
                value={formData.raizes_quais}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    raizes_quais: e.target.value,
                  })
                }
              />
            )}


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Edemas na região?</label>
              </Text>

              <RadioGroup
                value={formData.edema}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    edema: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />

              </RadioGroup>
            </div>


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Bruxismo?</label>
              </Text>

              <RadioGroup
                value={formData.bruxismo}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    bruxismo: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />

              </RadioGroup>
            </div>


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Atrito/Erosão ou abrasão</label>
              </Text>

              <RadioGroup
                value={formData.atricao_erosao_abrasao}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    atricao_erosao_abrasao: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />

              </RadioGroup>
            </div>


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Apertamento dental:</label>
              </Text>

              <RadioGroup
                value={formData.apertamento}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    apertamento: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />

              </RadioGroup>
            </div>


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Roe unhas?</label>
              </Text>

              <RadioGroup
                value={formData.unhas}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    unhas: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />

              </RadioGroup>
            </div>


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Morde objetos(tampa de caneta, lápis)?</label>
              </Text>

              <RadioGroup
                value={formData.morde_objetos}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    morde_objetos: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />

              </RadioGroup>
            </div>


            {formData.morde_objetos === "SIM" && (
              <TextField
                label="Quais?"
                variant="filled"
                value={formData.objetos_quais}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    objetos_quais: e.target.value,
                  })
                }
              />
            )}


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Se considera tenso ou nervoso?</label>
              </Text>

              <RadioGroup
                value={formData.tenso}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    tenso: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />

              </RadioGroup>
            </div>


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Ausência de dentes?</label>
              </Text>

              <RadioGroup
                value={formData.ausencia_dentes}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    ausencia_dentes: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />

              </RadioGroup>
            </div>


            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Utiliza prótese dentária?</label>
              </Text>

              <RadioGroup
                value={formData.protese}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    protese: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />

              </RadioGroup>
            </div>


            {formData.protese === "SIM" && (
              <TextField
                label="Onde?"
                variant="filled"
                value={formData.qual_protese}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    qual_protese: e.target.value,
                  })
                }
              />
            )}


            


            <Text size="lg">2- ODONTOGRAMA</Text>
            <Odontogram
              tooth={(labelT: any, zoneT: any, idT: any) => {
                // @ts-expect-error - odontograa não tipado corretamente
                setData((oldArray) => [
                  ...oldArray,
                  {
                    label: labelT,
                    zone: zoneT,
                    id: idT,
                  },
                ]);
              }}
              rtooth={(id: any) => {
                setData((current) =>
                  current.filter((obj) => {
                    // @ts-expect-error - odontograa não tipado corretamente
                    return obj.id !== id;
                  }),
                );
              }}
            />
            {data.map((obj) => {
              const dataWihoutThis = data.filter((item) => {
                // @ts-expect-error - odontograa não tipado corretamente
                return item.id !== obj.id;
              });

              return (
                // @ts-expect-error - odontograa não tipado corretamente
                <div key={obj.id} className="flex flex-col">
                  {/* @ts-expect-error - odontograa não tipado corretamente */}
                  <Text size="lg">{`${obj.label} - ${obj.zone}`}</Text>
                  <Select
                    variant="filled"
                    onChange={(e) => {
                      // @ts-expect-error - odontograa não tipado corretamente
                      setData(() => [
                        ...dataWihoutThis,
                        {
                          // @ts-expect-error - odontograa não tipado corretamente
                          id: obj.id,
                          // @ts-expect-error - odontograa não tipado corretamente
                          label: obj.label,
                          // @ts-expect-error - odontograa não tipado corretamente
                          zone: obj.zone,

                          observation: e.target.value,
                        },
                      ]);
                    }}
                  >
                    <MenuItem value="CARIADO">CARIADO</MenuItem>
                    <MenuItem value="HÍGIDO">HÍGIDO</MenuItem>
                    <MenuItem value="AUSENTE">AUSENTE</MenuItem>
                    <MenuItem value="RESTAURADO">RESTAURADO</MenuItem>
                    <MenuItem value="MANCHA BRANCA">MANCHA BRANCA</MenuItem>
                  </Select>
                </div>
              );
            })}
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
import Odontogram from "@/components/elements/odontograma/Odontogram";
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
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";

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
