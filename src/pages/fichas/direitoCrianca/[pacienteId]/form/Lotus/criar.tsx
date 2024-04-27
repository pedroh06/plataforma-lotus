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

export default function direitoCrianca() {
  const router = useRouter();
  const { pacienteId } = router.query;

  const [residents, setResidents] = useState([]);
  const [resident, setResident] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCreateForm, setIsLoadingCreateForm] = useState(false);

  const [formData, setFormDate] = useState({
    report: "",
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
      await axios.post("/api/fichas/direitoCrianca", {
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
        <h1 className="bold text-xl">Direito (Criança)</h1>

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
              <Text>Relatório:</Text>
              <TextField
                label=""
                variant="filled"
                value={formData.report}
                onChange={(e) =>
                  setFormDate({
                    ...formData,
                    report: e.target.value,
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
