import { Description, Field, Fieldset, Input, Label, Legend, Select } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

const FormComponent = ({ formData, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value); // Update the corresponding field in parent state
  };

  return (
    <Fieldset className="rounded-3xl bg-black/15 backdrop-blur-lg p-6 sm:p-10 grid grid-cols-2 gap-6">
        <div className='flex flex-col gap-4'>
          <Legend className="text-lg/7 font-semibold text-white">Car Origin</Legend>
          <Field>
            <Label className="text-sm/6 font-medium text-white">Car Model</Label>
            <Input
              name='Car Model'
              className={clsx(
                'mt-1 block w-full rounded-lg border-none bg-black/15 py-1.5 px-3 text-sm/6 text-white',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
              )}
              value={formData["Car Model"]}
              onChange={handleInputChange}
            />
          </Field>


          <Field>
            <Label className="text-sm/6 font-medium text-white">Car Maker</Label>
            <Input
              name='Car Makes'
              value={formData["Car Makes"]}
              onChange={handleInputChange}
              className={clsx(
                'mt-1 block w-full rounded-lg border-none bg-black/15 py-1.5 px-3 text-sm/6 text-white',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
              )}
            />
          </Field>

          <Field>
            <Label className="text-sm/6 font-medium text-white">Year</Label>
            <Input
              name='Year'
              value={formData["Year"]}
              onChange={handleInputChange}
              className={clsx(
                'mt-1 block w-full rounded-lg border-none bg-black/15 py-1.5 px-3 text-sm/6 text-white',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
              )}
            />
          </Field>

          <Field>
            <Label className="text-sm/6 font-medium text-white">Color</Label>
            <Description className="text-sm/6 text-white/50"> </Description>
            <div className="relative">
              <Select
                name='Color'
                value={formData["Color"]}
                onChange={handleInputChange}
                className={clsx(
                  'mt-1 block w-full appearance-none rounded-lg border-none bg-white/15  py-1.5 px-3 text-sm/6 text-white',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                  // Make the text of each option black on Windows
                  '*:text-black'
                )}
              >
                <option>Gold</option>
                <option>White</option>
                <option>Blue</option>
                <option>Gray</option>
                <option>Black</option>
                <option>Green</option>
                <option>Silver</option>
                <option>Beige</option>
                <option>Other</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                aria-hidden="true"
              />
            </div>
          </Field>

        </div>





        {/* other type */}
        <div className='flex flex-col gap-4'>
          <Legend className="text-lg/7 font-semibold text-white">Car Condition</Legend>
          <Field>
            <Label className="text-sm/6 font-medium text-white">Condition</Label>
            <Description className="text-sm/6 text-white/50"> </Description>
            <div className="relative">
              <Select
                name='Condition'
                value={formData["Condition"]}
                onChange={handleInputChange}
                className={clsx(
                  'mt-1 block w-full appearance-none rounded-lg border-none bg-white/15  py-1.5 px-3 text-sm/6 text-white',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                  // Make the text of each option black on Windows
                  '*:text-black'
                )}
              >
                <option>Used</option>
                <option>New</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                aria-hidden="true"
              />
            </div>
          </Field>

          <Field>
            <Label className="text-sm/6 font-medium text-white">Tax Type</Label>
            <Description className="text-sm/6 text-white/50"> </Description>
            <div className="relative">
              <Select
              name='Tax Type'
              value={formData['Tax Type']}
              onChange={handleInputChange}
                className={clsx(
                  'mt-1 *:block w-full appearance-none rounded-lg border-none bg-white/15 py-1.5 px-3 text-sm/6 text-white',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                  // Make the text of each option black on Windows
                  '*:text-black'
                )}
              >
                <option>Plate Number</option>
                <option>Tax Paper</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                aria-hidden="true"
              />
            </div>
          </Field>


          <Field>
            <Label className="text-sm/6 font-medium text-white">Transmission</Label>
            <Description className="text-sm/6 text-white/50"> </Description>
            <div className="relative">
              <Select
              name='Transmission'
                value={formData["Transmission"]}
                onChange={handleInputChange}
                className={clsx(
                  'mt-1 *:block w-full appearance-none rounded-lg border-none bg-white/15 py-1.5 px-3 text-sm/6 text-white',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                  // Make the text of each option black on Windows
                  '*:text-black'
                )}
              >
                <option>Auto</option>
                <option>Manual</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                aria-hidden="true"
              />
            </div>
          </Field>


          <Field>
            <Label className="text-sm/6 font-medium text-white">Body Type</Label>
            <Description className="text-sm/6 text-white/50"> </Description>
            <div className="relative">
              <Select
                name='Body Type'
                value={formData["Body Type"]}
                onChange={handleInputChange}
                className={clsx(
                  'mt-1 block w-full appearance-none rounded-lg border-none bg-white/15  py-1.5 px-3 text-sm/6 text-white',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                  // Make the text of each option black on Windows
                  '*:text-black'
                )}
              >
                <option>Sedan</option>
                <option>Sports</option>
                <option>SUV</option>
                <option>Pickup</option>
                <option>Hatchback</option>
                <option>Station Wagon</option>
                <option>MPV(Minivan)</option>
                <option>other</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                aria-hidden="true"
              />
            </div>
          </Field>



          <Field>
            <Label className="text-sm/6 font-medium text-white">Fuel Type</Label>
            <Description className="text-sm/6 text-white/50"> </Description>
            <div className="relative">
              <Select
              name='Fuel Type'
              value={formData["Fuel Type"]}
              onChange={handleInputChange}
                className={clsx(
                  'mt-1 block w-full appearance-none rounded-lg border-none bg-white/15  py-1.5 px-3 text-sm/6 text-white',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                  // Make the text of each option black on Windows
                  '*:text-black'
                )}
              >
                <option>Petrol</option>
                <option>Disel</option>
                <option>Hybrid</option>
                <option>Electricity</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                aria-hidden="true"
              />
            </div>
          </Field>
        </div>
      </Fieldset>
  )
}

export default FormComponent;