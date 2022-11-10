import { z } from "zod"
import { WalletType } from "@features/wallets/wallets-store"
import { Form, FormField, useForm } from "@mk/ui/components/form"
import { useMutation } from "@tanstack/react-query"
import fetcher from "@lib/fetcher"
import { ApiPath } from "@server/path"
import { useToast } from "@lib/toast"
import { ValidationError } from "@mk/fetcher"
import Button from "@mk/ui/components/button"
import Input from "@mk/ui/components/input"
import { RadioGroup, RadioOptionCard } from "@mk/ui/components/radio-group"
import BankIcon from "@mk/ui/icons/bank-icon"
import CardIcon from "@mk/ui/icons/card-icon"
import CashIcon from "@mk/ui/icons/cash-icon"
import ChartIcon from "@mk/ui/icons/chart-icon"
import BitcoinCurrencyIcon from "@mk/ui/icons/bitcoin-currency-icon"

const walletSchema = z.object({
  name: z.string().min(1).max(255),
  currency: z.string().optional(),
  defaultCategories: z.boolean().optional(),
  type: z.nativeEnum(WalletType).optional(),
})

type WalletRequest = z.infer<typeof walletSchema>

async function createNewWallet(data: WalletRequest) {
  return await fetcher.post<WalletRequest>(ApiPath.wallets, {
    data,
  })
}

function useCreateNewWallet() {
  const pushToast = useToast((s) => s.push)

  const { mutate, isLoading, error } = useMutation({
    mutationFn: createNewWallet,
    onSuccess: ({ data }) => {
      pushToast({
        type: "success",
        message: `Wallet ${data.name} was successfully created`,
      })
    },
  })

  return {
    loading: isLoading,
    create: mutate,
    errors: (error instanceof ValidationError && error.errors) || {},
  }
}

function NewWalletForm() {
  const form = useForm({
    schema: walletSchema,
  })
  const { loading, create, errors } = useCreateNewWallet()

  return (
    <Form form={form} serverErrors={errors} onSubmit={create}>
      <div className="grid grid-cols-6 gap-10">
        <FormField className="col-span-6 sm:col-span-3">
          <FormField.Label>Wallet name</FormField.Label>
          <Input
            type="text"
            placeholder="Input name"
            {...form.register("name")}
          />
        </FormField>

        <FormField className="col-span-6 sm:col-span-3">
          <FormField.Label>Wallet currency</FormField.Label>
          <Input
            type="text"
            placeholder="Pick currency"
            {...form.register("currency")}
          />
        </FormField>

        <FormField className="col-span-6">
          <FormField.Label>Select wallet type</FormField.Label>
          <RadioGroup>
            <RadioGroup.Label className="sr-only">Wallet type</RadioGroup.Label>
            <div className="grid grid-flow-col auto-cols-fr gap-6 max-w-5xl">
              <RadioGroup.Option value={WalletType.Cash}>
                <RadioOptionCard>
                  <CashIcon size="large" />
                  <RadioGroup.Label>Cash Balance</RadioGroup.Label>
                </RadioOptionCard>
              </RadioGroup.Option>

              <RadioGroup.Option value={WalletType.Card}>
                <RadioOptionCard>
                  <CardIcon size="large" />
                  <RadioGroup.Label>Credit Card</RadioGroup.Label>
                </RadioOptionCard>
              </RadioGroup.Option>

              <RadioGroup.Option value={WalletType.Bank}>
                <RadioOptionCard>
                  <BankIcon size="large" />
                  <RadioGroup.Label>Bank Account</RadioGroup.Label>
                </RadioOptionCard>
              </RadioGroup.Option>

              <RadioGroup.Option value={WalletType.Crypto}>
                <RadioOptionCard>
                  <BitcoinCurrencyIcon size="large" />
                  <RadioGroup.Label>Crypto Wallet</RadioGroup.Label>
                </RadioOptionCard>
              </RadioGroup.Option>

              <RadioGroup.Option value={WalletType.Investment}>
                <RadioOptionCard>
                  <ChartIcon size="large" />
                  <RadioGroup.Label>Investment Account</RadioGroup.Label>
                </RadioOptionCard>
              </RadioGroup.Option>
            </div>
          </RadioGroup>
        </FormField>
      </div>

      <Button intend="primary" loading={loading}>
        Create wallet
      </Button>
    </Form>
  )
}

export default NewWalletForm
