import { Button, Card, CardFooter, Image } from '@nextui-org/react';
export default function Index() {
  const tabs = ['AI', 'Tool', 'Blob'];
  return (
    <div>
      <div className="h-20 text-right">header</div>
      <div className="text-center text-5xl">Source gather</div>
      <div className="flex justify-center mt-20">
        {tabs.map((item) => {
          return <Button className="mr-12 w-20 h-10">{item}</Button>;
        })}
      </div>

      <div className="mt-16 grid grid-cols-3 gap-4 px-16">
        {Array(10)
          .fill(1)
          .map((item) => {
            return (
              <Card
                isFooterBlurred
                radius="lg"
                className="border-none w-100 h-100"
              >
                <Image
                  alt="Woman listing to music"
                  className="object-cover"
                  src="https://nextui.org/images/hero-card.jpeg"
                />
                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <p className="text-tiny text-white/80">Available soon.</p>
                  <Button
                    className="text-tiny text-white bg-black/20"
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="sm"
                  >
                    Notify me
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
