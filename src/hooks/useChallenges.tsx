
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useChallenges = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: challenges, isLoading } = useQuery({
    queryKey: ['challenges'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .order('difficulty', { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const { data: progress } = useQuery({
    queryKey: ['challengeProgress', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_challenge_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const startChallengeMutation = useMutation({
    mutationFn: async (challengeId: string) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('user_challenge_progress')
        .upsert({
          user_id: user.id,
          challenge_id: challengeId,
          completed: false,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challengeProgress', user?.id] });
    },
  });

  const completeChallengeMutation = useMutation({
    mutationFn: async ({ challengeId, score }: { challengeId: string; score: number }) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('user_challenge_progress')
        .update({
          completed: true,
          score,
          completed_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
        .eq('challenge_id', challengeId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challengeProgress', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['userStats', user?.id] });
    },
  });

  return {
    challenges,
    progress,
    isLoading,
    startChallenge: startChallengeMutation.mutate,
    completeChallenge: completeChallengeMutation.mutate,
  };
};
