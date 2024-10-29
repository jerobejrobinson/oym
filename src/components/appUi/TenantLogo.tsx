import Image from 'next/image'
type TenantLogoProps = {
    url: string;
    name: string
}
export default function TenantLogo({url, name}: TenantLogoProps) {
    return (
        <Image
            src={url}
            alt={name}
            width={250}
            height={100}
        />
    )
}