import { Github, Linkedin, Facebook, Instagram, Twitter, X } from 'lucide-react'

const Socials = () => {
    return (
        <div className="fixed flex flex-col left-5 h-screen items-center align-middle z-10 justify-center gap-6 max-xl:hidden">
            <a
                href="https://github.com/luniostudios"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="p-2 rounded-full bg-black hover:bg-linear-to-r hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110"
            >
                <Github className="w-5 h-5 text-white" />
            </a>
            <a
                href="https://www.linkedin.com/company/luniostudios/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="p-2 rounded-full bg-black hover:bg-linear-to-r hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110"
            >
                <Linkedin className="w-5 h-5 text-white" />
            </a>
            <a
                href="https://www.facebook.com/profile.php?id=61575845991065"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="p-2 rounded-full bg-black hover:bg-linear-to-r hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110"
            >
                <Facebook className="w-5 h-5 text-white" />
            </a>
            <a
                href="https://www.instagram.com/lunio_studios/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="p-2 rounded-full bg-black hover:bg-linear-to-r hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110"
            >
                <Instagram className="w-5 h-5 text-white" />
            </a>
            <a
                href="https://x.com/LUNIOStudios"
                target="_blank"
                rel="noopener noreferrer"
                title="X"
                className="p-2 rounded-full bg-black hover:bg-linear-to-r hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110"
            >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                    <g fill="#ffffff" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none"><g transform="scale(5.33333,5.33333)"><path d="M41,6l-31.071,36h-3.714l31.072,-36z" fillRule="nonzero"></path><path d="M31.143,41l-23.323,-34h8.957l23.323,34z" fillRule="evenodd"></path><path d="M15.724,9l20.578,30h-4.106l-20.578,-30h4.106M17.304,6h-11.382l24.694,36h11.382l-24.694,-36z" fillRule="nonzero"></path></g></g>
                </svg>
            </a>
            <a
                href="https://discord.gg/kyjxUCTA"
                target="_blank"
                rel="noopener noreferrer"
                title="Discord"
                className="p-2 rounded-full bg-black hover:bg-linear-to-r hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110"
            >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                    <g fill="#ffffff" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none"><g transform="scale(5.33333,5.33333)"><path d="M39.248,10.177c-2.804,-1.287 -5.812,-2.235 -8.956,-2.778c-0.057,-0.01 -0.114,0.016 -0.144,0.068c-0.387,0.688 -0.815,1.585 -1.115,2.291c-3.382,-0.506 -6.747,-0.506 -10.059,0c-0.3,-0.721 -0.744,-1.603 -1.133,-2.291c-0.03,-0.051 -0.087,-0.077 -0.144,-0.068c-3.143,0.541 -6.15,1.489 -8.956,2.778c-0.024,0.01 -0.045,0.028 -0.059,0.051c-5.704,8.522 -7.267,16.835 -6.5,25.044c0.003,0.04 0.026,0.079 0.057,0.103c3.763,2.764 7.409,4.442 10.987,5.554c0.057,0.017 0.118,-0.003 0.154,-0.051c0.846,-1.156 1.601,-2.374 2.248,-3.656c0.038,-0.075 0.002,-0.164 -0.076,-0.194c-1.197,-0.454 -2.336,-1.007 -3.432,-1.636c-0.087,-0.051 -0.094,-0.175 -0.014,-0.234c0.231,-0.173 0.461,-0.353 0.682,-0.534c0.04,-0.033 0.095,-0.04 0.142,-0.019c7.201,3.288 14.997,3.288 22.113,0c0.047,-0.023 0.102,-0.016 0.144,0.017c0.22,0.182 0.451,0.363 0.683,0.536c0.08,0.059 0.075,0.183 -0.012,0.234c-1.096,0.641 -2.236,1.182 -3.434,1.634c-0.078,0.03 -0.113,0.12 -0.075,0.196c0.661,1.28 1.415,2.498 2.246,3.654c0.035,0.049 0.097,0.07 0.154,0.052c3.595,-1.112 7.241,-2.79 11.004,-5.554c0.033,-0.024 0.054,-0.061 0.057,-0.101c0.917,-9.491 -1.537,-17.735 -6.505,-25.044c-0.012,-0.024 -0.033,-0.042 -0.057,-0.052zM16.703,30.273c-2.168,0 -3.954,-1.99 -3.954,-4.435c0,-2.445 1.752,-4.435 3.954,-4.435c2.22,0 3.989,2.008 3.954,4.435c0.001,2.444 -1.751,4.435 -3.954,4.435zM31.324,30.273c-2.168,0 -3.954,-1.99 -3.954,-4.435c0,-2.445 1.752,-4.435 3.954,-4.435c2.22,0 3.989,2.008 3.954,4.435c0,2.444 -1.734,4.435 -3.954,4.435z"></path></g></g>
                </svg>
            </a>
        </div>
    )
}

export default Socials