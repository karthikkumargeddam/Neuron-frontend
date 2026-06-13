import Link from 'next/link';
import { fetchAPI } from '../../../lib/api';

export default async function AdvancedLabsPage() {
  const response = await fetchAPI('/api/sandboxes', { populate: '*', pagination: { limit: 200 } }, { next: { revalidate: 60 } });
  const backendLabs = response?.data || [];
  
  const advancedLabsFromBackend = backendLabs.filter(lab => {
    const attrs = lab.attributes || lab;
    return attrs.title && attrs.description && attrs.description.includes('PhD Research');
  });

  const fallbackTopics = [
    {
      id: 'adv-lab-0',
      title: 'Transformers with Relative Positional Encoding',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Transformers with Relative Positional Encoding. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-1',
      title: 'Sparse Attention Mechanisms',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Sparse Attention Mechanisms. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-2',
      title: 'Reformer Architecture',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Reformer Architecture. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-3',
      title: 'Perceiver IO',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Perceiver IO. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-4',
      title: 'Neural Turing Machines',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Neural Turing Machines. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-5',
      title: 'Differentiable Neural Computer',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Differentiable Neural Computer. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-6',
      title: 'Capsule Networks',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Capsule Networks. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-7',
      title: 'Spiking Neural Networks',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Spiking Neural Networks. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-8',
      title: 'Liquid Time-Constant Networks',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Liquid Time-Constant Networks. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-9',
      title: 'Neural ODEs',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Neural ODEs. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-10',
      title: 'Continuous Normalizing Flows',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Continuous Normalizing Flows. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-11',
      title: 'Hamiltonian Neural Networks',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Hamiltonian Neural Networks. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-12',
      title: 'Graph Attention Networks (GAT)',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Graph Attention Networks (GAT). This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-13',
      title: 'Graph Isomorphism Networks (GIN)',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Graph Isomorphism Networks (GIN). This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-14',
      title: 'Equivariant Neural Networks',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Equivariant Neural Networks. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-15',
      title: 'SE(3)-Transformers',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into SE(3)-Transformers. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-16',
      title: 'Spherical CNNs',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Spherical CNNs. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-17',
      title: 'Implicit Neural Representations (SIREN)',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Implicit Neural Representations (SIREN). This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-18',
      title: 'HyperNetworks',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into HyperNetworks. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-19',
      title: 'Meta-Learning with MAML',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Meta-Learning with MAML. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-20',
      title: 'Reptile Meta-Learning',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Reptile Meta-Learning. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-21',
      title: 'Zero-Shot Learning with CLIP',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Zero-Shot Learning with CLIP. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-22',
      title: 'Few-Shot Prototypical Networks',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Few-Shot Prototypical Networks. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-23',
      title: 'Self-Supervised Contrastive Learning (SimCLR)',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Self-Supervised Contrastive Learning (SimCLR). This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-24',
      title: 'Bootstrap Your Own Latent (BYOL)',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Bootstrap Your Own Latent (BYOL). This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-25',
      title: 'Masked Autoencoders (MAE)',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Masked Autoencoders (MAE). This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-26',
      title: 'Energy-Based Models',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Energy-Based Models. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-27',
      title: 'Generative Flow Networks (GFlowNets)',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Generative Flow Networks (GFlowNets). This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-28',
      title: 'Diffusion Models (DDPM)',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Diffusion Models (DDPM). This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-29',
      title: 'Latent Diffusion Models',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Latent Diffusion Models. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-30',
      title: 'Score-Based Generative Modeling',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Score-Based Generative Modeling. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-31',
      title: 'Wasserstein GAN with Gradient Penalty',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Wasserstein GAN with Gradient Penalty. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-32',
      title: 'StyleGAN Architecture',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into StyleGAN Architecture. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-33',
      title: 'BigGAN',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into BigGAN. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-34',
      title: 'VQ-VAE-2',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into VQ-VAE-2. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-35',
      title: 'Vision Transformers (ViT)',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Vision Transformers (ViT). This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-36',
      title: 'Swin Transformer',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Swin Transformer. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-37',
      title: 'Mask R-CNN',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Mask R-CNN. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-38',
      title: 'YOLOv8 Object Detection',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into YOLOv8 Object Detection. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-39',
      title: 'DETR (DEtection TRansformer)',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into DETR (DEtection TRansformer). This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-40',
      title: 'Deformable DETR',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Deformable DETR. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-41',
      title: 'Panoptic Feature Pyramid Networks',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Panoptic Feature Pyramid Networks. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-42',
      title: 'DeepLabV3+ Semantic Segmentation',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into DeepLabV3+ Semantic Segmentation. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-43',
      title: 'U-Net with Attention',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into U-Net with Attention. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-44',
      title: '3D U-Net for Medical Imaging',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into 3D U-Net for Medical Imaging. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-45',
      title: 'NeRF (Neural Radiance Fields)',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into NeRF (Neural Radiance Fields). This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-46',
      title: 'Mip-NeRF 360',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Mip-NeRF 360. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-47',
      title: 'Instant NGP',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Instant NGP. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-48',
      title: 'Gaussian Splatting',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Gaussian Splatting. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-49',
      title: 'Monocular Depth Estimation (MiDaS)',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Monocular Depth Estimation (MiDaS). This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-50',
      title: 'Optical Flow with RAFT',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Optical Flow with RAFT. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-51',
      title: 'Deep Stereo Matching',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Deep Stereo Matching. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-52',
      title: 'Super-Resolution GAN (SRGAN)',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Super-Resolution GAN (SRGAN). This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-53',
      title: 'ESRGAN',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into ESRGAN. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    },
    {
      id: 'adv-lab-54',
      title: 'Image Inpainting with Partial Convolutions',
      level: 'PhD / Post-Doc',
      description: 'Advanced PhD Research Lab: A deep dive into Image Inpainting with Partial Convolutions. This sandbox provides a GPU-accelerated environment to explore state-of-the-art algorithms and execute high-performance training loops.',
      status: 'Online',
    }
  ];

  const labsToDisplay = advancedLabsFromBackend.length > 0 ? advancedLabsFromBackend.map(lab => {
    const attrs = lab.attributes || lab;
    return {
      id: attrs.uuid || lab.id,
      title: attrs.title,
      level: 'PhD / Post-Doc',
      description: attrs.description,
      status: 'Online',
    };
  }) : fallbackTopics;

  return (
    <div className="min-h-screen p-8 md:p-16 max-w-7xl mx-auto animate-fade-in">
      <div className="mb-12 text-center">
        <div className="inline-block border border-[var(--accent)] bg-[rgba(244,63,94,0.1)] text-[var(--accent)] text-sm font-mono px-4 py-2 rounded-full mb-6">
          PhD Level
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Highly Advanced Labs</h1>
        <p className="text-xl text-gray-400">Explore 50+ cutting-edge research environments and architectures.</p>
      </div>

      <div className="mb-8 flex justify-center">
        <Link href="/labs" className="px-6 py-3 border border-gray-600 rounded-lg text-gray-300 hover:text-white hover:border-gray-400 transition-all">
          &larr; Back to All Labs
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {labsToDisplay.map((lab) => (
          <Link href={`/labs/${lab.id}`} key={lab.id}>
            <div className="glass-panel p-6 h-full hover:-translate-y-2 transition-transform duration-300 cursor-pointer flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-600 mix-blend-overlay filter blur-[64px] opacity-10 group-hover:opacity-30 transition-opacity"></div>
              
              <div className="inline-block border border-fuchsia-500 bg-fuchsia-500/10 text-fuchsia-400 text-[10px] font-mono px-2 py-1 rounded-full mb-4 self-start uppercase tracking-wider">
                {lab.level}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-fuchsia-400 transition-colors">{lab.title}</h3>
              <p className="text-gray-400 text-sm flex-grow line-clamp-3">{lab.description}</p>
              
              <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {lab.status}
                </div>
                <div className="text-xs font-bold text-fuchsia-500 group-hover:text-fuchsia-400 transition-colors">
                  ENTER LAB &rarr;
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
